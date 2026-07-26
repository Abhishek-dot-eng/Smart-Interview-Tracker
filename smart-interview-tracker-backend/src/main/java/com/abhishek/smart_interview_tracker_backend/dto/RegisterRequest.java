package com.abhishek.smart_interview_tracker_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String name;
    private String email;
    private String password;

    public RegisterRequest() {
    }


}