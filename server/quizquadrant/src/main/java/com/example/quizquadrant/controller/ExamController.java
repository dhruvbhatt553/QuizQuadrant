package com.example.quizquadrant.controller;

import com.example.quizquadrant.dto.CreateExamDto;
import com.example.quizquadrant.dto.ExamDto;
import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.Exam;
import com.example.quizquadrant.service.ExamService;
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
public class ExamController {

    private final PrivateQuestionService privateQuestionService;
    private final ExamService examService;
    private final ExamResponsesService examResponsesService;

    @Autowired
    public ExamController(PrivateQuestionService privateQuestionService, ExamService examService, ExamResponsesService examResponsesService) {
        this.privateQuestionService = privateQuestionService;
        this.examService = examService;
        this.examResponsesService = examResponsesService;
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
      
    @PostMapping("/store-response")
    public ExamResponses StorePrivateQuestionResponse (@RequestParam("privateQuestionId") Long privateQuestionId,@RequestParam("userId") Long userId,  @RequestBody ExamResponseDto examResponseDto) {
        return examResponsesService
    }

}
