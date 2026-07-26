package com.abhishek.smart_interview_tracker_backend.service;
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
    public Interview saveInterview(Interview interview) {

        User currentUser = getCurrentUser();

        interview.setUser(currentUser);

        return interviewRepository.save(interview);
    }

    // Get all Interviews of the logged-in user
    public List<Interview> getAllInterviews() {

        User currentUser = getCurrentUser();

        return interviewRepository.findByUser(currentUser);
    }

    // Get Interview by ID
    public Interview getInterviewById(Long id) {
        return getOwnedInterview(id);
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
    public Interview updateInterview(Long id, Interview updatedInterview) {

        Interview interview = getOwnedInterview(id);

        interview.setCompany(updatedInterview.getCompany());
        interview.setRole(updatedInterview.getRole());
        interview.setInterviewDate(updatedInterview.getInterviewDate());
        interview.setStatus(updatedInterview.getStatus());
        interview.setNotes(updatedInterview.getNotes());

        return interviewRepository.save(interview);
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

}