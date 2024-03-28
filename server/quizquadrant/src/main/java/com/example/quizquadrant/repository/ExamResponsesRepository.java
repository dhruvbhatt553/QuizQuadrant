package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.ExamResponseKey;
import com.example.quizquadrant.model.ExamResponses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamResponsesRepository extends JpaRepository<ExamResponses, ExamResponseKey> {
}
