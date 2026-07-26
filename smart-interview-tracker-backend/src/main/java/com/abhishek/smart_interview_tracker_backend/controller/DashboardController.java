package com.abhishek.smart_interview_tracker_backend.controller;

import com.abhishek.smart_interview_tracker_backend.dto.DashboardResponse;
import com.abhishek.smart_interview_tracker_backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.abhishek.smart_interview_tracker_backend.dto.RecentInterviewResponse;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboard();
    }

    @GetMapping("/recent")
    public List<RecentInterviewResponse> getRecentInterviews() {
        return dashboardService.getRecentInterviews();
    }
}