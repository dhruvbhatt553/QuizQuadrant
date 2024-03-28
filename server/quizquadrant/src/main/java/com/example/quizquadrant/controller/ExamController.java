package com.example.quizquadrant.controller;

import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.dto.ExamResponseDto;
import com.example.quizquadrant.model.ExamResponses;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.service.ExamResponsesService;
import com.example.quizquadrant.service.PrivateQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/exam")
public class        ExamController {

    private final PrivateQuestionService privateQuestionService;
    private final ExamResponsesService examResponsesService;

    @Autowired
    public ExamController(PrivateQuestionService privateQuestionService, ExamResponsesService examResponsesService) {
        this.privateQuestionService = privateQuestionService;
        this.examResponsesService = examResponsesService;
    }

    @GetMapping("/get-question-by-id")
    public ExamQuestionDto getPrivateQuestionById(@RequestParam("questionId") Long privateQuestionId) {
        return privateQuestionService.getPrivateQuestionById(privateQuestionId);
    }

    @PostMapping("/store-response")
    public ExamResponses StorePrivateQuestionResponse (@RequestParam("privateQuestionId") Long privateQuestionId,@RequestParam("userId") Long userId,  @RequestBody ExamResponseDto examResponseDto) {
        return examResponsesService
    }

}
