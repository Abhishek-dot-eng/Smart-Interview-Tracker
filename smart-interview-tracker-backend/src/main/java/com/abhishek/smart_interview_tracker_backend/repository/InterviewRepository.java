package com.abhishek.smart_interview_tracker_backend.repository;

import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long>,
        JpaSpecificationExecutor<Interview> {

    // Used in InterviewService
    List<Interview> findByUser(User user);

    // Used in DashboardService
    long countByUser(User user);

    // Used in DashboardService
    long countByUserAndStatus(User user, String status);


    List<Interview> findTop5ByUserOrderByInterviewDateDesc(User user);

}