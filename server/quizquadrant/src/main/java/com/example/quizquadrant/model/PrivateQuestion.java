package com.example.quizquadrant.model;


import jakarta.persistence.*;

@Entity
@Table(
        name = "privatequestion"
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

    //    TODO foreign key ...
    @Column (
            name = "solutionId"
    )
    private Long solutionId;

    @Column(
            name = "hasImage",
            nullable = false,
            columnDefinition = "BOOLEAN"
    )
    private Boolean hasImage;

    @Column (
            name = "subtopicId"
    )
    private Long subtopicId;

    public PrivateQuestion(String statement, String type, Long solutionId, Boolean hasImage, Long subtopicId) {
        this.statement = statement;
        this.type = type;
        this.solutionId = solutionId;
        this.hasImage = hasImage;
        this.subtopicId = subtopicId;
    }

    public PrivateQuestion() {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSolutionId() {
        return solutionId;
    }

    public void setSolutionId(Long solutionId) {
        this.solutionId = solutionId;
    }

    public Boolean getHasImage() {
        return hasImage;
    }

    public void setHasImage(Boolean hasImage) {
        this.hasImage = hasImage;
    }

    public Long getSubtopicId() {
        return subtopicId;
    }

    public void setSubtopicId(Long subtopicId) {
        this.subtopicId = subtopicId;
    }

    @Override
    public String toString() {
        return "PrivateQuestion{" +
                "id=" + id +
                ", statement='" + statement + '\'' +
                ", type='" + type + '\'' +
                ", solutionId=" + solutionId +
                ", hasImage=" + hasImage +
                ", subtopicId=" + subtopicId +
                '}';
    }
}
