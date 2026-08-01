package com.abhishek.smart_interview_tracker_backend.controller;

import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import com.abhishek.smart_interview_tracker_backend.repository.UserRepository;
import com.abhishek.smart_interview_tracker_backend.dto.InterviewResponseDTO;
import com.abhishek.smart_interview_tracker_backend.dto.InterviewRequestDTO;


import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    private final UserRepository userRepository;

    public InterviewController(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    // Create Interview
    @PostMapping
    public InterviewResponseDTO createInterview(
            @Valid @RequestBody InterviewRequestDTO request
    ){

        return interviewService.saveInterview(request);
    }

    // Get All Interviews
    @GetMapping
    public List<InterviewResponseDTO> getAllInterviews(){

        return interviewService.getAllInterviews();
    }

    // Get Interview By ID
    @GetMapping("/{id}")
    public InterviewResponseDTO getInterviewById(
            @PathVariable Long id
    ){

        return interviewService.getInterviewById(id);
    }

    // Delete Interview
    @DeleteMapping("/{id}")
    public void deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
    }

    // Update Interview
    @PutMapping("/{id}")
    public InterviewResponseDTO updateInterview(
            @Valid
            @PathVariable Long id,
            @RequestBody InterviewRequestDTO request) {

        return interviewService.updateInterview(id, request);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Interview>> searchInterviews(

            @RequestParam(required = false) String company,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to,
            @RequestParam(required = false) Boolean upcoming

    ) {

        List<Interview> interviews = interviewService.searchInterviews(
                company,
                role,
                status,
                from,
                to,
                upcoming
        );

        return ResponseEntity.ok(interviews);
    }

    @GetMapping("/recent")
    public List<Interview> getRecentInterviews(
            Authentication authentication
    ){

        User user =
                userRepository.findByEmail(
                                authentication.getName()
                        )
                        .orElseThrow(() ->
                                new RuntimeException("User not found")
                        );


        return interviewService
                .getRecentInterviews(user);

    }
}