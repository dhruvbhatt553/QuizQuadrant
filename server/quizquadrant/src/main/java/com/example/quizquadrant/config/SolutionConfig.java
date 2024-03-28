//package com.example.quizquadrant.config;
//
//import com.example.quizquadrant.model.Solution;
//import com.example.quizquadrant.repository.SolutionRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//
//import java.util.List;
//
//@Configuration
//@Order(3)
//public class SolutionConfig {
//    @Bean(name = "solutionBean")
//    CommandLineRunner commandLineRunner(SolutionRepository solutionRepository) {
//        return args -> {
//            Solution s1 = new Solution(
//                    "some solution ...",
//                    false
//            );
//            solutionRepository.saveAll(
//                    List.of(s1)
//            );
//        };
//    }
//}
