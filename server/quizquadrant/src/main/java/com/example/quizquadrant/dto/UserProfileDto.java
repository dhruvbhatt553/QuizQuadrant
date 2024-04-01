package com.example.quizquadrant.dto;

import java.util.List;

public record UserProfileDto(
        String name,
        String email,
        String type,
        List<UserProfileOngoingAndFutureExamDto> examsCreated,
        List<UserProfilePastExamDto> pastExams,
        List<UserProfileOngoingAndFutureExamDto> ongoingExams,
        List<UserProfileOngoingAndFutureExamDto> futureExams
) {
}
