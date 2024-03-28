package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.Result;
import com.example.quizquadrant.model.ResultKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, ResultKey> {

}