//package com.example.quizquadrant.config;
//import com.example.quizquadrant.model.Subject;
//import com.example.quizquadrant.model.Subtopic;
//import com.example.quizquadrant.repository.SubjectRepository;
//import com.example.quizquadrant.repository.SubtopicRepository;
//import com.example.quizquadrant.repository.SubjectRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SubjectConfig {
//    @Bean(name = "subjectBean")
//    CommandLineRunner commandLineRunner(SubjectRepository subjectRepository) {
//        return args -> {
//            Subject subject1 = new Subject(
//                    "DSA"
//            );
//
//            Subtopic subtopic1 = new Subtopic(
//                    "Backtracking",
//                    subject1
//
//            );
//
//            subtopic1 = subtopicRepository.save(subtopic1);
//            subject1 = subjectRepository.save(subject1);
//            subjectRepository.saveAll(
//                    List.of(subject1)
//            );
//        };
//    }
//}
