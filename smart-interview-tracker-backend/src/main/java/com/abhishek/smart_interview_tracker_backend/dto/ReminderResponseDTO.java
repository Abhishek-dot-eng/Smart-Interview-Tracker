package com.abhishek.smart_interview_tracker_backend.dto;


import java.time.LocalDate;

public class ReminderResponseDTO {


    private Long id;

    private String title;

    private String description;

    private LocalDate reminderDate;

    private Boolean completed;


    public ReminderResponseDTO(
            Long id,
            String title,
            String description,
            LocalDate reminderDate,
            Boolean completed
    ){

        this.id = id;
        this.title = title;
        this.description = description;
        this.reminderDate = reminderDate;
        this.completed = completed;

    }


    public Long getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }


    public String getDescription() {
        return description;
    }


    public LocalDate getReminderDate() {
        return reminderDate;
    }


    public Boolean getCompleted() {
        return completed;
    }
}
