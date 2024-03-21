package com.example.quizquadrant.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subtopic")
public class Subtopic {
    @Id
    @SequenceGenerator(
            name = "subtopic_sequence",
            sequenceName = "subtopic_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "subtopic_sequence"
    )
    private Long id;

    @Column(
            name = "subtopicName",
            nullable = false,
            columnDefinition ="VARCHAR(20)"
    )
    private String subtopicName;

    @Column(
            name = "subjectId"
    )
    private Long subjectId;

    public Subtopic(String subtopicName, Long subjectId) {
        this.subtopicName = subtopicName;
        this.subjectId = subjectId;
    }

    public Subtopic() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubtopicName() {
        return subtopicName;
    }

    public void setSubtopicName(String subtopicName) {
        this.subtopicName = subtopicName;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    @Override
    public String toString() {
        return "Subtopic{" +
                "id=" + id +
                ", subtopicName='" + subtopicName + '\'' +
                ", subjectId=" + subjectId +
                '}';
    }
}
