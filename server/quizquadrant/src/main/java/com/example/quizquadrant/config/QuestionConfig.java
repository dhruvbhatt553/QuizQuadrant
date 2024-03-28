//package com.example.quizquadrant.config;
//
//import com.example.quizquadrant.model.Question;
//import com.example.quizquadrant.model.Solution;
//import com.example.quizquadrant.model.Subtopic;
//import com.example.quizquadrant.repository.QuestionRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//
//import java.util.List;
//
//@Configuration
//@Order(4)
//public class QuestionConfig {
//    @Bean(name = "questionBean")
//    CommandLineRunner commandLineRunner(QuestionRepository questionRepository) {
//        return args -> {
//            Subtopic subtopic = new Subtopic();
//            subtopic.setId(1L);
//            Solution solution = new Solution();
//            solution.setId(1L);
//            Question q1 = new Question(
//                    "some statement ...",
//                    "mcq",
//                    false,
//                    subtopic,
//                    solution
//            );
//            questionRepository.saveAll(
//                    List.of(q1)
//            );
//        };
//    }
//}
