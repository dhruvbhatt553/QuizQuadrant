package com.example.quizquadrant.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "result")
@IdClass(ResultKey.class)
public class Result {

    @Id
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Column(
            name = "marks",
            nullable = false,
            columnDefinition = "INTEGER"
    )
    private Integer marks;

}
