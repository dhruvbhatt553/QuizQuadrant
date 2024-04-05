package com.example.quizquadrant.dto;

public record AuthenticationResponseDto(
        String token,
        String name,
        String email,
        Long userId
) {
}
