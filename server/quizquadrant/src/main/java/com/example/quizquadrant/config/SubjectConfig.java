//package com.example.quizquadrant.config;
//
//import com.example.quizquadrant.model.Subject;
//import com.example.quizquadrant.repository.SubjectRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class SubjectConfig {
//    @Bean(name = "subjectBean")
//    CommandLineRunner commandLineRunner(SubjectRepository subjectRepository) {
//        return args -> {
//            Subject subject1 = new Subject(
//                    "DSA"
//            );
//            subjectRepository.saveAll(
//                    List.of(subject1)
//            );
//        };
//    }
//}
