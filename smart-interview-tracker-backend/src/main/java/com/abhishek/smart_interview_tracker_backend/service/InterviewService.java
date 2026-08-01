package com.abhishek.smart_interview_tracker_backend.service;

import com.abhishek.smart_interview_tracker_backend.dto.InterviewResponseDTO;
import com.abhishek.smart_interview_tracker_backend.dto.InterviewRequestDTO;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.repository.InterviewRepository;
import com.abhishek.smart_interview_tracker_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.abhishek.smart_interview_tracker_backend.specification.InterviewSpecification;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private UserRepository userRepository;

    // Save Interview
    public InterviewResponseDTO saveInterview(
            InterviewRequestDTO request
    ){

        User currentUser = getCurrentUser();


        Interview interview = new Interview();

        interview.setCompany(request.getCompany());

        interview.setRole(request.getRole());

        interview.setInterviewDate(
                request.getInterviewDate()
        );

        interview.setStatus(
                request.getStatus()
        );

        interview.setNotes(
                request.getNotes()
        );


        interview.setUser(currentUser);


        Interview savedInterview =
                interviewRepository.save(interview);


        return convertToDTO(savedInterview);
    }

    // Get all Interviews of the logged-in user
    public List<InterviewResponseDTO> getAllInterviews(){

        User currentUser = getCurrentUser();

        return interviewRepository
                .findByUser(currentUser)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Get Interview by ID
    public InterviewResponseDTO getInterviewById(Long id){

        Interview interview = getOwnedInterview(id);

        return convertToDTO(interview);
    }

    // Delete Interview
    public void deleteInterview(Long id) {

        Interview interview = getOwnedInterview(id);

        interviewRepository.delete(interview);
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication.getName();
    }

    private User getCurrentUser() {
        String email = getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private Interview getOwnedInterview(Long id) {

        User currentUser = getCurrentUser();

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        if (!interview.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        return interview;
    }

    // Update Interview
    public InterviewResponseDTO updateInterview(
            Long id,
            InterviewRequestDTO request
    ){

        Interview existingInterview =
                getOwnedInterview(id);


        existingInterview.setCompany(
                request.getCompany()
        );

        existingInterview.setRole(
                request.getRole()
        );

        existingInterview.setInterviewDate(
                request.getInterviewDate()
        );

        existingInterview.setStatus(
                request.getStatus()
        );

        existingInterview.setNotes(
                request.getNotes()
        );


        Interview updatedInterview =
                interviewRepository.save(existingInterview);


        return convertToDTO(updatedInterview);
    }


    public List<Interview> searchInterviews(
            String company,
            String role,
            String status,
            LocalDate from,
            LocalDate to,
            Boolean upcoming
    ) {

        // Get the logged-in user
        User currentUser = getCurrentUser();

        // Build the specification
        Specification<Interview> specification =
                InterviewSpecification.filterInterviews(
                        currentUser,
                        company,
                        role,
                        status,
                        from,
                        to,
                        upcoming
                );

        // Execute the query
        return interviewRepository.findAll(specification);
    }

    public List<Interview> getRecentInterviews(User user){

        return interviewRepository
                .findTop5ByUserOrderByInterviewDateDesc(user);

    }

    private InterviewResponseDTO convertToDTO(Interview interview){

        return new InterviewResponseDTO(

                interview.getId(),
                interview.getCompany(),
                interview.getRole(),
                interview.getInterviewDate(),
                interview.getStatus(),
                interview.getNotes()

        );
    }

}