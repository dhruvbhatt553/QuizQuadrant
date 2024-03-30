package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.Exam;
import com.example.quizquadrant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

   // public Optional<List<Exam>> findExamsByCreator (User user);
}
