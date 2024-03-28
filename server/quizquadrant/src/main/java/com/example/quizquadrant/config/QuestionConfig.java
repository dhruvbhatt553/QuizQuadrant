package com.example.quizquadrant.config;

import com.example.quizquadrant.dto.CreateQuestionDto;
import com.example.quizquadrant.repository.QuestionRepository;
import com.example.quizquadrant.service.QuestionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class QuestionConfig {
    @Bean(name = "questionBean")
    CommandLineRunner commandLineRunner(QuestionService questionService) {
        return args -> {
//            Q1
            this.addQuestion(
                    questionService,
                    "msq",
                    1L,
                    1L,
                    4,
                    -1,
                    "suhwyggggggggdggdgdgsdjsddnjsndjdcnjdncjdcnjnjdncjdc",
                    "ekmfejfuhebfe",
                    "option A",
                    "",
                    "option B",
                    "",
                    "option c",
                    "kdijedied",
                    "option d",
                    "jendhefbebf",
                    "I am solu Register by March 26 to save 30%.",
                    "ckidhjufh",
                    List.of("A", "B")
            );

//            Q2
            this.addQuestion(
                    questionService,
                    "mcq",
                    1L,
                    1L,
                    2,
                    0,
                    "Question - 2",
                    "ekmfejfuhebfe",
                    "option A",
                    "",
                    "option B",
                    "",
                    "option c",
                    "kdijedied",
                    "option d",
                    "jendhefbebf",
                    "I am solu Register by March 26 to save 30%.",
                    "ckidhjufh",
                    List.of("B")
            );
        };
    }

    private void addQuestion(
            QuestionService questionService,
            String type,
            Long subjectId,
            Long subtopicId,
            Integer positiveMarks,
            Integer negativeMarks,
            String questionStatement,
            String questionImageURL,
            String optionAStatement,
            String optionAImageURL,
            String optionBStatement,
            String optionBImageURL,
            String optionCStatement,
            String optionCImageURL,
            String optionDStatement,
            String optionDImageURL,
            String solutionStatement,
            String solutionImageURL,
            List<String> correctAnswer
    ) {
        questionService.createQuestion(
                new CreateQuestionDto(
                    type,
                    subjectId,
                    subtopicId,
                    positiveMarks,
                    negativeMarks,
                    questionStatement,
                    questionImageURL,
                    optionAStatement,
                    optionAImageURL,
                    optionBStatement,
                    optionBImageURL,
                    optionCStatement,
                    optionCImageURL,
                    optionDStatement,
                    optionDImageURL,
                    solutionStatement,
                    solutionImageURL,
                    correctAnswer
            )
        );
    }
}
