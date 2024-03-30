package com.example.quizquadrant.service;


import com.example.quizquadrant.dto.PrivateQuestionResponsesDto;
import com.example.quizquadrant.model.*;
import com.example.quizquadrant.repository.ExamResponsesRepository;
import com.example.quizquadrant.repository.PrivateQuestionRepository;
import com.example.quizquadrant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamResponsesService {

    private final ExamResponsesRepository examResponsesRepository;
    private final UserRepository userRepository;
    private final PrivateQuestionRepository privateQuestionRepository;

    @Autowired
    public ExamResponsesService(ExamResponsesRepository examResponsesRepository, UserRepository userRepository, PrivateQuestionRepository privateQuestionRepository) {
        this.examResponsesRepository = examResponsesRepository;
        this.userRepository = userRepository;
        this.privateQuestionRepository = privateQuestionRepository;
    }

    public ExamResponses storePrivateQuestionResponses(Long userId, Long privateQuestionId, PrivateQuestionResponsesDto privateQuestionResponsesDto) {
        User u = userRepository.findById(userId).get();
        PrivateQuestion q = privateQuestionRepository.findById(privateQuestionId).get();

        ExamResponseKey examResponseKey = new ExamResponseKey();
        examResponseKey.setUser(u);
        examResponseKey.setPrivateQuestion(q);

        Optional<ExamResponses> examResponses = examResponsesRepository.findById(examResponseKey);
        if(!examResponses.isEmpty()) {
            List<Boolean> ans = privateQuestionResponsesDto.response();
            ExamResponses examResponsesNew = new ExamResponses(u, q, ans.get(0), ans.get(1), ans.get(2), ans.get(3));
            return examResponsesRepository.save(examResponsesNew);
        }
        else
            return examResponses.orElse(null);

    }

    public ExamResponses getExamResponsesByUserAndQuestion(User user, PrivateQuestion privateQuestion) {
        return examResponsesRepository.findExamResponsesByUserAndPrivateQuestion(user, privateQuestion);
    }

    public void removeResponses(User user, List<PrivateQuestion> privateQuestionList) {
        examResponsesRepository.deleteExamResponsesByUserAndAndPrivateQuestion(user,privateQuestionList);
    }
}
