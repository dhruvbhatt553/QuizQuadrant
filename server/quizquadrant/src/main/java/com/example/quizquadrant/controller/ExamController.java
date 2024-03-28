package com.example.quizquadrant.controller;

import com.example.quizquadrant.dto.CreateExamDto;
import com.example.quizquadrant.dto.ExamDto;
import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.Exam;
import com.example.quizquadrant.service.ExamService;
import com.example.quizquadrant.service.PrivateQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/exam")
public class        ExamController {

    private final PrivateQuestionService privateQuestionService;
    private final ExamService examService;

    @Autowired
    public ExamController(PrivateQuestionService privateQuestionService, ExamService examService) {
        this.privateQuestionService = privateQuestionService;
        this.examService = examService;
    }

    @GetMapping("/get-question-by-id")
    public ExamQuestionDto getPrivateQuestionById(@RequestParam("questionId") Long privateQuestionId) {
        return privateQuestionService.getPrivateQuestionById(privateQuestionId);
    }

    @GetMapping("/get-exam-by-id")
    public ExamDto getExamById(@RequestParam("examId") Long examId) {
        return examService.getExamById(examId);
    }

    @PostMapping("/create-exam")
    public Exam createExam(@RequestBody CreateExamDto createExamDto) {
        return examService.createExam(createExamDto);
    }

}
