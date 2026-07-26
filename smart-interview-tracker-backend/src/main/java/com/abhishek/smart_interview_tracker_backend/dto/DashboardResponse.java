package com.abhishek.smart_interview_tracker_backend.dto;

public class DashboardResponse {

    private long totalInterviews;
    private long upcomingInterviews;
    private long completedInterviews;
    private long rejectedInterviews;


    public DashboardResponse() {
    }


    public DashboardResponse(long totalInterviews,
                             long upcomingInterviews,
                             long completedInterviews,
                             long rejectedInterviews) {

        this.totalInterviews = totalInterviews;
        this.upcomingInterviews = upcomingInterviews;
        this.completedInterviews = completedInterviews;
        this.rejectedInterviews = rejectedInterviews;
    }


    public long getTotalInterviews() {
        return totalInterviews;
    }

    public long getUpcomingInterviews() {
        return upcomingInterviews;
    }

    public long getCompletedInterviews() {
        return completedInterviews;
    }

    public long getRejectedInterviews() {
        return rejectedInterviews;
    }
}
