package com.abhishek.smart_interview_tracker_backend.controller;

import com.abhishek.smart_interview_tracker_backend.dto.ReminderRequestDTO;
import com.abhishek.smart_interview_tracker_backend.dto.ReminderResponseDTO;
import com.abhishek.smart_interview_tracker_backend.repository.UserRepository;
import com.abhishek.smart_interview_tracker_backend.service.ReminderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.abhishek.smart_interview_tracker_backend.entity.User;



import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    private final ReminderService reminderService;

    @Autowired
    private UserRepository userRepository;



    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;

    }

    @PostMapping("/{interviewId}")
    public ReminderResponseDTO createReminder(
            @Valid @PathVariable Long interviewId,
            @RequestBody ReminderRequestDTO request
    ) {

        return reminderService.createReminder(interviewId, request);
    }



    @GetMapping("/{interviewId}")
    public List<ReminderResponseDTO> getReminders(
            @PathVariable Long interviewId
    ) {

        return reminderService.getReminders(interviewId);
    }

    @PutMapping("/{reminderId}")
    public ReminderResponseDTO updateReminder(
            @Valid @PathVariable Long reminderId,
            @RequestBody ReminderRequestDTO request
    ) {

        return reminderService.updateReminder(reminderId, request);
    }

    @DeleteMapping("/{reminderId}")
    public void deleteReminder(@PathVariable Long reminderId) {

        reminderService.deleteReminder(reminderId);
    }

    @PatchMapping("/{reminderId}/complete")
    public ReminderResponseDTO markCompleted(
            @PathVariable Long reminderId
    ) {

        return reminderService.markCompleted(reminderId);
    }

    @GetMapping("/upcoming")
    public List<ReminderResponseDTO> getUpcomingReminders(
            Authentication authentication
    ){

        User user =
                userRepository.findByEmail(
                                authentication.getName()
                        )
                        .orElseThrow(() -> new RuntimeException("User not found"));


        return reminderService
                .getUpcomingReminders(user);

    }
}