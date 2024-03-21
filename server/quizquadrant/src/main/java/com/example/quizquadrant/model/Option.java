package com.example.quizquadrant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "option_table")
public class Option {

    @Id
    @SequenceGenerator(
            name = "option_sequence",
            sequenceName = "option_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "option_sequence"
    )
    private Long id;

    @Column(
            name = "statement",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String statement;

    @Column(
            name = "hasImage",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean hasImage;

    public Option(String statement, Boolean hasImage) {
        this.statement = statement;
        this.hasImage = hasImage;
    }

    public Option() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public Boolean getHasImage() {
        return hasImage;
    }

    public void setHasImage(Boolean hasImage) {
        this.hasImage = hasImage;
    }

    @Override
    public String toString() {
        return "Option{" +
                "id=" + id +
                ", statement='" + statement + '\'' +
                ", hasImage=" + hasImage +
                '}';
    }
}
