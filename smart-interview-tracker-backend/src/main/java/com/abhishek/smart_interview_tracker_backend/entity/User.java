package com.abhishek.smart_interview_tracker_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.abhishek.smart_interview_tracker_backend.entity.base.BaseEntity;
@Getter
@Setter
@Table(name = "users")
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role = "USER";


}
