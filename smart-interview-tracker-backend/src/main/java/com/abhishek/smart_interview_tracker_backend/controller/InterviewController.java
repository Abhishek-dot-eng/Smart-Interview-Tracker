package com.abhishek.smart_interview_tracker_backend.controller;

import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    // Create Interview
    @PostMapping
    public Interview createInterview(@RequestBody Interview interview) {
        return interviewService.saveInterview(interview);
    }

    // Get All Interviews
    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    // Get Interview By ID
    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id);
    }

    // Delete Interview
    @DeleteMapping("/{id}")
    public void deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
    }

    // Update Interview
    @PutMapping("/{id}")
    public Interview updateInterview(@PathVariable Long id,
                                     @RequestBody Interview interview) {

        return interviewService.updateInterview(id, interview);
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
}