package com.example.quizquadrant.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Table(
        name = "user",
        uniqueConstraints = {
                @UniqueConstraint(
                        name ="uk_user_email",
                        columnNames = "email"
                )
        }
)
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition ="VARCHAR(20)"
    )
    private String name;

    @Column(
            name = "email",
            nullable = false,
            unique = true,
            columnDefinition ="VARCHAR(20)"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Column(
            name = "type",
            columnDefinition ="CHAR(1)"
    )
    private String type;

    @OneToMany(
            mappedBy = "creator",
            cascade = CascadeType.REMOVE
    )
    private List<Exam> examsCreated;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.REMOVE
    )
    private List<Result> examResults;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.REMOVE
    )
    private List<ExamResponses> examResponses;
}
