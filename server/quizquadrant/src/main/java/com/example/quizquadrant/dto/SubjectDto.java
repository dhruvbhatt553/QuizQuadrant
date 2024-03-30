package com.example.quizquadrant.dto;

import java.util.List;

public record SubjectDto (
        String subjectName,
        Long subId,
        List<SubtopicDto> subtopics
){
}
