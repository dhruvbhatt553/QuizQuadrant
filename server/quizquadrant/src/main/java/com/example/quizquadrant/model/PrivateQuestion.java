package com.example.quizquadrant.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "privateQuestion"
)
public class PrivateQuestion {
    @Id
    @SequenceGenerator(
            name = "private_question_sequence",
            sequenceName = "private_question_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "private_question_sequence"
    )
    private Long id;

    @Column(
            name = "statement",
            nullable = false,
            columnDefinition ="LONGTEXT"
    )
    private String statement;

    @Column(
            name = "type",
            nullable = false,
            columnDefinition ="CHAR(3)"
    )
    private String type;

    @Column(
            name = "hasImage",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean hasImage;

    @Column(
            name = "positiveMarks"
    )
    private Integer positiveMarks;

    @Column(
            name = "negativeMarks"
    )
    private Integer negativeMarks;


    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "subtopicId", referencedColumnName = "id")
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId")
    private Subtopic subtopic;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "examId")
    private Exam exam;

    @OneToMany(
            mappedBy = "privateQuestion",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<ExamResponses> examResponses;

    @OneToMany(
            mappedBy = "privateQuestion",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<PrivateOption> privateOptions;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "privateSolutionId")
    private PrivateSolution privateSolution;
}
