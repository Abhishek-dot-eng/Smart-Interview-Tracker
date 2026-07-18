package com.abhishek.smart_interview_tracker_backend.repository;

import com.abhishek.smart_interview_tracker_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
