package com.abhishek.smart_interview_tracker_backend.repository;

import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.entity.Reminder;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByInterview(Interview interview);

    List<Reminder> findByCompleted(boolean completed);

    List<Reminder> findByReminderDate(LocalDate reminderDate);

    List<Reminder> findByReminderDateBetween(LocalDate startDate, LocalDate endDate);

    List<Reminder> findByInterviewUserIdAndCompletedFalseAndReminderDateGreaterThanEqual(
            Long userId,
            LocalDate date
    );

    List<Reminder> findTop5ByInterviewUserAndCompletedFalseOrderByReminderDateAsc(User user);



}