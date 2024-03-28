package com.example.quizquadrant.service;

import com.example.quizquadrant.model.PrivateOption;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.model.Question;
import com.example.quizquadrant.repository.PrivateOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrivateOptionService {

    private final PrivateOptionRepository privateOptionRepository;

    @Autowired
    public PrivateOptionService(PrivateOptionRepository privateOptionRepository) {
        this.privateOptionRepository = privateOptionRepository;
    }

    public PrivateOption createPrivateOption(
            String statement,
            Boolean hasImage,
            Boolean isCorrect,
            PrivateQuestion privateQuestion
    ) {
        PrivateOption privateOption = new PrivateOption(
                statement,
                hasImage,
                isCorrect,
                privateQuestion
        );
        return privateOptionRepository.save(privateOption);
    }

}
