package com.example.quizquadrant.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
            columnDefinition = "DATE"
    )
    private Date startDateTime;

    @Column(
            name = "duration",
            nullable = false,
            columnDefinition = "int(4)"
    )
    private int duration;

    public Exam(String title, Date startDateTime, int duration) {
        this.title = title;
        this.startDateTime = startDateTime;
        this.duration = duration;
    }

    public Exam() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Exam{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", startDateTime=" + startDateTime +
                ", duration=" + duration +
                '}';
    }
}
