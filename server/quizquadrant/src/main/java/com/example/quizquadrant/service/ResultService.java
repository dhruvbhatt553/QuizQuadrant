package com.example.quizquadrant.service;

import com.example.quizquadrant.model.Exam;
import com.example.quizquadrant.model.Result;
import com.example.quizquadrant.model.User;
import com.example.quizquadrant.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public List<Result> createResults(List<User> users, Exam exam) {
        List<Result> results = new ArrayList<>();

        for(User user: users) {
            Result result = new Result(
                    user,
                    exam,
                    0
            );
            result = resultRepository.save(result);

            results.add(result);
        }

        return results;
    }

}
