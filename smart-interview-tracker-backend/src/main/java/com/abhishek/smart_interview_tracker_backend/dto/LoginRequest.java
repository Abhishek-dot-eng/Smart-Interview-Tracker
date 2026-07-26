package com.abhishek.smart_interview_tracker_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginRequest {

    private String email;
    private String password;

    public LoginRequest() {
    }


}