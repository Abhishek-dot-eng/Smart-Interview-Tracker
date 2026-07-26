package com.abhishek.smart_interview_tracker_backend.specification;

import com.abhishek.smart_interview_tracker_backend.entity.Interview;
import com.abhishek.smart_interview_tracker_backend.entity.User;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class InterviewSpecification {

    public static Specification<Interview> filterInterviews(
            User user,
            String company,
            String role,
            String status,
            LocalDate from,
            LocalDate to,
            Boolean upcoming
    ) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Always return only the logged-in user's interviews
            predicates.add(criteriaBuilder.equal(root.get("user"), user));

            // Company filter
            if (company != null && !company.isBlank()) {
                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("company")),
                                "%" + company.toLowerCase() + "%"
                        )
                );
            }

            // Role filter
            if (role != null && !role.isBlank()) {
                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("role")),
                                "%" + role.toLowerCase() + "%"
                        )
                );
            }

            // Status filter
            if (status != null && !status.isBlank()) {
                predicates.add(
                        criteriaBuilder.equal(root.get("status"), status)
                );
            }

            // From date
            if (from != null) {
                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("interviewDate"),
                                from
                        )
                );
            }

            // To date
            if (to != null) {
                predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("interviewDate"),
                                to
                        )
                );
            }

            // Upcoming interviews
            if (Boolean.TRUE.equals(upcoming)) {
                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("interviewDate"),
                                LocalDate.now()
                        )
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}