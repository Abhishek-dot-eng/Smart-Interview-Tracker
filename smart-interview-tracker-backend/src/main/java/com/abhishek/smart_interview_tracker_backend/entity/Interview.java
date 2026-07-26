package com.abhishek.smart_interview_tracker_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;

    private String role;

    private LocalDate interviewDate;

    private String status;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    public Interview() {
    }


}