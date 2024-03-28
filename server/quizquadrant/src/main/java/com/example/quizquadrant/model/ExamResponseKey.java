package com.example.quizquadrant.model;

import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
public class ExamResponseKey implements Serializable {
    private Exam exam;
    private User user;
    private PrivateQuestion privateQuestion;
}
