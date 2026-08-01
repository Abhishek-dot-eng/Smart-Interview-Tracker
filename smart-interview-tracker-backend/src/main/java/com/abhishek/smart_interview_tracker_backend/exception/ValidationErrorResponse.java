package com.abhishek.smart_interview_tracker_backend.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ValidationErrorResponse {

    private boolean success;
    private String message;
    private Map<String, String> errors;
    private LocalDateTime timestamp;

    public ValidationErrorResponse(String message, Map<String, String> errors) {
        this.success = false;
        this.message = message;
        this.errors = errors;
        this.timestamp = LocalDateTime.now();
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}