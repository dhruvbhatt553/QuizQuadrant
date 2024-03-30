package com.example.quizquadrant.dto;

public record UserProfilePastExamDto(
        Long id,
        String title,
        String startDate,
        String startTime,
        Integer duration,
        Integer totalMarks,
        Integer obtainedMarks,
        Boolean isPresent,
        Boolean isResultGenerated
) {
}
