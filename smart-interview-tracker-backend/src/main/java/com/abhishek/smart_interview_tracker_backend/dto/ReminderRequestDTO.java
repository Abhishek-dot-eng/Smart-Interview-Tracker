package com.abhishek.smart_interview_tracker_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class ReminderRequestDTO {


    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Reminder date is required")
    private LocalDate reminderDate;

    @NotNull(message = "Completed status is required")
    private Boolean completed;

    private Long interviewId;


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public LocalDate getReminderDate() {
        return reminderDate;
    }


    public void setReminderDate(LocalDate reminderDate) {
        this.reminderDate = reminderDate;
    }


    public Boolean getCompleted() {
        return completed;
    }


    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }


    public Long getInterviewId() {
        return interviewId;
    }


    public void setInterviewId(Long interviewId) {
        this.interviewId = interviewId;
    }
}