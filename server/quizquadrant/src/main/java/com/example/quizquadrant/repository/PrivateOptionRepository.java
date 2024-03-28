package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.PrivateOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateOptionRepository extends JpaRepository<PrivateOption, Long> {
}
