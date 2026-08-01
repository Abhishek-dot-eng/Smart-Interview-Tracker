package com.abhishek.smart_interview_tracker_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import com.abhishek.smart_interview_tracker_backend.entity.base.BaseEntity;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Interview extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Job role is required")
    private String role;

    @NotNull(message = "Interview date is required")
    @FutureOrPresent(message = "Interview date cannot be in the past")
    private LocalDate interviewDate;

    @NotBlank(message = "Status is required")
    private String status;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    public Interview() {
    }


}