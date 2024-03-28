package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.PrivateSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateSolutionRepository extends JpaRepository<PrivateSolution, Long> {
}
