package com.abhishek.smart_interview_tracker_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.validation.constraints.*;
import com.abhishek.smart_interview_tracker_backend.entity.base.BaseEntity;
@Entity
@Table(name = "reminders")
public class Reminder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Reminder title is required")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotNull(message = "Reminder date is required")
    @FutureOrPresent(message = "Reminder date cannot be in the past")
    private LocalDate reminderDate;

    private boolean completed = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id")
    private Interview interview;

    public Reminder() {
    }

    public Reminder(Long id, String title, String description,
                    LocalDate reminderDate, boolean completed,
                    Interview interview) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.reminderDate = reminderDate;
        this.completed = completed;
        this.interview = interview;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Interview getInterview() {
        return interview;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
    }
}