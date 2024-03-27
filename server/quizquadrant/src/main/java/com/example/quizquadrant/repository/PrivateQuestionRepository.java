package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.PrivateQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateQuestionRepository extends JpaRepository<PrivateQuestion, Long> {
}
