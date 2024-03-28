package com.example.quizquadrant.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "exam")
public class Exam {
    @Id
    @SequenceGenerator(
            name = "exam_sequence",
            sequenceName = "exam_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "exam_sequence"
    )
    private Long id;

    @Column(
            name = "title",
            nullable = false,
            columnDefinition ="VARCHAR(200)"
    )
    private String title;

    @Column(
            name = "startDateTime",
            nullable = false,
            columnDefinition = "DATETIME"
    )
    private LocalDateTime startDateTime;

    @Column(
            name = "isResultGenerated",
            nullable = false
    )
    private Boolean isResultGenerated;

    @Column(
            name = "duration",
            nullable = false,
            columnDefinition = "int(4)"
    )
    private Integer duration;

    @OneToMany(
            mappedBy = "exam",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<Result> examResults;

    @ManyToOne
    @JsonBackReference
    @JoinColumn (name = "creator")
    private User creator;

    @OneToMany(
            mappedBy = "exam",
            cascade = CascadeType.REMOVE
    )
    @JsonManagedReference
    private List<PrivateQuestion> privateQuestions;
  
  //    @OneToMany(
  //            mappedBy = "exam",
  //            cascade = CascadeType.REMOVE
  //    )
  //    private List<ExamResponses> examResponses;
  



//    constructors

    public Exam(
            String title,
            LocalDateTime startDateTime,
            Boolean isResultGenerated,
            Integer duration,
            User creator
    ) {
        this.title = title;
        this.startDateTime = startDateTime;
        this.isResultGenerated = isResultGenerated;
        this.duration = duration;
        this.creator = creator;
    }

}