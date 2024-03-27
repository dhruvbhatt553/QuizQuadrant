package com.example.quizquadrant.controller;

import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.service.PrivateQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/exam")
public class        ExamController {

    private final PrivateQuestionService privateQuestionService;

    @Autowired
    public ExamController(PrivateQuestionService privateQuestionService) {
        this.privateQuestionService = privateQuestionService;
    }

    @GetMapping("/get-question-by-id")
    public ExamQuestionDto getPrivateQuestionById(@RequestParam("questionId") Long privateQuestionId) {
        return privateQuestionService.getPrivateQuestionById(privateQuestionId);
    }

}
