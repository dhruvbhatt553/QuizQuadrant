package com.example.quizquadrant.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @JsonManagedReference
    private List<Exam> examsCreated;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<Result> examResults;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<ExamResponses> examResponses;
}

// leaderboard - ok
// show result for teacher - ok
// user by id - ok
// Send subjects to Home page