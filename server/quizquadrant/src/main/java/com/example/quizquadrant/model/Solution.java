package com.example.quizquadrant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solution")
public class Solution {

    @Id
    @SequenceGenerator(
            name = "solution_sequence",
            sequenceName = "solution_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "solution_sequence"
    )
    private Long id;

    @Column(
            name = "statement",
            nullable = false,
            columnDefinition = "LONGTEXT"
    )
    private String statement;

    @Column(
            name = "hasImage",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean hasImage;

    public Solution(String statement, Boolean hasImage) {
        this.statement = statement;
        this.hasImage = hasImage;
    }

    public Solution() {
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
        return "Solution{" +
                "id=" + id +
                ", statement='" + statement + '\'' +
                ", hasImage=" + hasImage +
                '}';
    }
}
