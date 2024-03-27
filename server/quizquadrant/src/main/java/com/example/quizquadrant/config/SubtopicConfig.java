//package com.example.quizquadrant.config;
//
//import com.example.quizquadrant.model.Subject;
//import com.example.quizquadrant.model.Subtopic;
//import com.example.quizquadrant.repository.SubtopicRepository;
//import com.example.quizquadrant.service.SubjectService;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.DependsOn;
//
//import java.util.List;
//
//@Configuration
//@DependsOn("subjectService")
//public class SubtopicConfig {
//
//    private final SubjectService subjectService;
//
//    @Autowired
//    public SubtopicConfig(SubjectService subjectService) {
//        this.subjectService = subjectService;
//    }
//
//    @Transactional
//    @Bean(name = "subtopicBean")
//    CommandLineRunner commandLineRunner(SubtopicRepository subtopicRepository) {
//        return args -> {
//            Subject subject1 = subjectService.getSubjectById(1L);
//
//            Subtopic subtopic1 = new Subtopic(
//                    "Backtracking",
//                    subject1
//
//            );
//
//            subtopicRepository.saveAll(
//                    List.of(subtopic1)
//            );
//        };
//    }
//}