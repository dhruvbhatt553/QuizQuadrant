package com.example.quizquadrant.model;


import jakarta.persistence.*;

@Entity
@Table(name = "examResponses")
@IdClass(ExamResponseKey.class)
public class ExamResponses {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Id
    @ManyToOne
    @JoinColumn(name = "privatequestion_id")
    private PrivateQuestion privateQuestion;

    @Column(
            name = "optionAMarked",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean optionAMarked;

    @Column(
            name = "optionBMarked",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean optionBMarked;

    @Column(
            name = "optionCMarked",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean optionCMarked;

    @Column(
            name = "optionDMarked",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean optionDMarked;
}
