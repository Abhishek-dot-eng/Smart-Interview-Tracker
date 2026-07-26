package com.abhishek.smart_interview_tracker_backend.dto;

import java.time.LocalDate;

public class RecentInterviewResponse {

    private String company;
    private String role;
    private LocalDate interviewDate;
    private String status;

    public RecentInterviewResponse() {
    }

    public RecentInterviewResponse(String company, String role,
                                   LocalDate interviewDate,
                                   String status) {
        this.company = company;
        this.role = role;
        this.interviewDate = interviewDate;
        this.status = status;
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
}