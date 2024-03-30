package com.example.quizquadrant.dto;

public record UserProfileOngoingAndFutureExamDto(
        Long id,
        String title,
        String startDate,
        String startTime,
        Integer duration,
        Integer totalMarks
) {
}
