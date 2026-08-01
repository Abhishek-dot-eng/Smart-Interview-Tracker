package com.abhishek.smart_interview_tracker_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmartInterviewTrackerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartInterviewTrackerBackendApplication.class, args);
	}

}
