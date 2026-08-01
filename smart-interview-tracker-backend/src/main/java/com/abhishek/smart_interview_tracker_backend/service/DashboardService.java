package com.abhishek.smart_interview_tracker_backend.service;

import com.abhishek.smart_interview_tracker_backend.dto.DashboardResponse;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import com.abhishek.smart_interview_tracker_backend.repository.InterviewRepository;
import com.abhishek.smart_interview_tracker_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.abhishek.smart_interview_tracker_backend.dto.RecentInterviewResponse;
import com.abhishek.smart_interview_tracker_backend.entity.Interview;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public DashboardService(InterviewRepository interviewRepository,
                            UserRepository userRepository) {
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboard() {

        User currentUser = getCurrentUser();

        long totalApplications =
                interviewRepository.countByUser(currentUser);

        long applied =
                interviewRepository.countByUserAndStatus(
                        currentUser,
                        "Applied"
                );

        long scheduled =
                interviewRepository.countByUserAndStatus(
                        currentUser,
                        "Scheduled"
                );

        long completed =
                interviewRepository.countByUserAndStatus(
                        currentUser,
                        "Completed"
                );

        long offers =
                interviewRepository.countByUserAndStatus(
                        currentUser,
                        "Offer"
                );

        long rejected =
                interviewRepository.countByUserAndStatus(
                        currentUser,
                        "Rejected"
                );

        long pending = applied + scheduled;

        return new DashboardResponse(
                totalApplications,
                applied,
                scheduled,
                completed,
                offers,
                rejected,
                pending
        );
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
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<RecentInterviewResponse> getRecentInterviews() {

        User currentUser = getCurrentUser();

        List<Interview> interviews =
                interviewRepository.findTop5ByUserOrderByInterviewDateDesc(currentUser);

        return interviews.stream()
                .map(interview -> new RecentInterviewResponse(
                        interview.getCompany(),
                        interview.getRole(),
                        interview.getInterviewDate(),
                        interview.getStatus()
                ))
                .collect(Collectors.toList());
    }
}