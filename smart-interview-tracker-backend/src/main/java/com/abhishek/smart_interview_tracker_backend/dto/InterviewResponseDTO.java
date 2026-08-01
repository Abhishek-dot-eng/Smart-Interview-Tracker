package com.abhishek.smart_interview_tracker_backend.dto;

import java.time.LocalDate;

public class InterviewResponseDTO {

    private Long id;

    private String company;

    private String role;

    private LocalDate interviewDate;

    private String status;

    private String notes;


    public InterviewResponseDTO(
            Long id,
            String company,
            String role,
            LocalDate interviewDate,
            String status,
            String notes
    ){

        this.id = id;
        this.company = company;
        this.role = role;
        this.interviewDate = interviewDate;
        this.status = status;
        this.notes = notes;

    }


    public Long getId() {
        return id;
    }


    public String getCompany() {
        return company;
    }


    public String getRole() {
        return role;
    }


    public LocalDate getInterviewDate() {
        return interviewDate;
    }


    public String getStatus() {
        return status;
    }


    public String getNotes() {
        return notes;
    }
}