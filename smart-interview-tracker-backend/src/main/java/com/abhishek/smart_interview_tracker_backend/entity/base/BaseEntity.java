package com.abhishek.smart_interview_tracker_backend.entity.base;


import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;


@MappedSuperclass
@Getter
public abstract class BaseEntity {


    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;


    @LastModifiedDate
    private LocalDateTime updatedAt;

}