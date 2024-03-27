package com.example.quizquadrant.controller;

import com.example.quizquadrant.dto.CreateMockTest;
import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.model.Question;
import com.example.quizquadrant.service.PrivateQuestionService;
import com.example.quizquadrant.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/mock-test")
public class MockTestController {

    private final QuestionService questionService;

    @Autowired
    public MockTestController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/get-questions")
    public List<Long> getPrivateQuestionById(@RequestBody CreateMockTest createMockTest, @RequestParam("total") Integer total) {
        return questionService.getQuestionIdsBySubtopics(createMockTest,total);
    }

}
