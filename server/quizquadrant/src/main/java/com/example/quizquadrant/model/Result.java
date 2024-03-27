package com.example.quizquadrant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "result")
@IdClass(ResultKey.class)
public class Result {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Column(
            name = "marks",
            nullable = false,
            columnDefinition = "INTEGER"
    )
    private Integer marks;
}
