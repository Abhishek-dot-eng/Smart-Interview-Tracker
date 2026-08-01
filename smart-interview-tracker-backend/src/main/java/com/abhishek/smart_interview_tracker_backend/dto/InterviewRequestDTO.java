package com.abhishek.smart_interview_tracker_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class InterviewRequestDTO {


    @NotBlank(message = "Company is required")
    @Size(max = 100, message = "Company cannot exceed 100 characters")
    private String company;

    @NotBlank(message = "Role is required")
    @Size(max = 100, message = "Role cannot exceed 100 characters")
    private String role;

    @NotNull(message = "Interview date is required")
    private LocalDate interviewDate;

    @NotBlank(message = "Status is required")
    private String status;

    @Size(max = 1000, message = "Notes cannot exceed 1000 characters")
    private String notes;


    public String getCompany() {
        return company;
    }


    public void setCompany(String company) {
        this.company = company;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public LocalDate getInterviewDate() {
        return interviewDate;
    }


    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


    public String getNotes() {
        return notes;
    }


    public void setNotes(String notes) {
        this.notes = notes;
    }
}