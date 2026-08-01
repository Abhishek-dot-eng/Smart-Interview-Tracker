package com.abhishek.smart_interview_tracker_backend.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {

    private long totalApplications;
    private long applied;
    private long scheduled;
    private long completed;
    private long offers;
    private long rejected;
    private long pending;


    public DashboardResponse() {
    }


    public DashboardResponse(
            long totalApplications,
            long applied,
            long scheduled,
            long completed,
            long offers,
            long rejected,
            long pending
    ) {
        this.totalApplications = totalApplications;
        this.applied = applied;
        this.scheduled = scheduled;
        this.completed = completed;
        this.offers = offers;
        this.rejected = rejected;
        this.pending = pending;
    }



}