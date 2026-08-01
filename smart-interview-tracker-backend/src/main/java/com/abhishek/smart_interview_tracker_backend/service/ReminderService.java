package com.abhishek.smart_interview_tracker_backend.service;

import com.abhishek.smart_interview_tracker_backend.dto.ReminderRequestDTO;
import com.abhishek.smart_interview_tracker_backend.dto.ReminderResponseDTO;
import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.entity.Reminder;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import com.abhishek.smart_interview_tracker_backend.repository.InterviewRepository;
import com.abhishek.smart_interview_tracker_backend.repository.ReminderRepository;
import com.abhishek.smart_interview_tracker_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReminderService {

    private final ReminderRepository reminderRepository;
    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public ReminderService(ReminderRepository reminderRepository,
                           InterviewRepository interviewRepository,
                           UserRepository userRepository) {
        this.reminderRepository = reminderRepository;
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Interview getOwnedInterview(Long interviewId) {

        User currentUser = getCurrentUser();

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        if (!interview.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        return interview;
    }

    public ReminderResponseDTO createReminder(
            Long interviewId,
            ReminderRequestDTO request
    ) {

        Interview interview = getOwnedInterview(interviewId);

        Reminder reminder = new Reminder();

        reminder.setTitle(
                request.getTitle()
        );

        reminder.setDescription(
                request.getDescription()
        );

        reminder.setReminderDate(
                request.getReminderDate()
        );

        reminder.setCompleted(false);

        reminder.setInterview(interview);

        Reminder saved =
                reminderRepository.save(reminder);

        return convertToDTO(saved);
    }

    private ReminderResponseDTO convertToDTO(Reminder reminder){

        return new ReminderResponseDTO(

                reminder.getId(),
                reminder.getTitle(),
                reminder.getDescription(),
                reminder.getReminderDate(),
                reminder.isCompleted()

        );
    }

    public ReminderResponseDTO updateReminder(
            Long reminderId,
            ReminderRequestDTO request
    ) {

        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        getOwnedInterview(reminder.getInterview().getId());


        reminder.setTitle(request.getTitle());

        reminder.setDescription(request.getDescription());

        reminder.setReminderDate(request.getReminderDate());

        reminder.setCompleted(request.getCompleted());


        Reminder saved =
                reminderRepository.save(reminder);


        return convertToDTO(saved);
    }

    public void deleteReminder(Long reminderId) {

        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        getOwnedInterview(reminder.getInterview().getId());

        reminderRepository.delete(reminder);
    }

    public ReminderResponseDTO markCompleted(Long reminderId) {

        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));


        getOwnedInterview(reminder.getInterview().getId());


        reminder.setCompleted(true);


        Reminder saved =
                reminderRepository.save(reminder);


        return convertToDTO(saved);
    }

    public List<ReminderResponseDTO> getUpcomingReminders(User user){

        return reminderRepository
                .findTop5ByInterviewUserAndCompletedFalseOrderByReminderDateAsc(user)
                .stream()
                .map(reminder -> new ReminderResponseDTO(
                        reminder.getId(),
                        reminder.getTitle(),
                        reminder.getDescription(),
                        reminder.getReminderDate(),
                        reminder.isCompleted()
                ))
                .toList();

    }

    public List<ReminderResponseDTO> getReminders(Long interviewId) {

        Interview interview = getOwnedInterview(interviewId);


        return reminderRepository
                .findByInterview(interview)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


}