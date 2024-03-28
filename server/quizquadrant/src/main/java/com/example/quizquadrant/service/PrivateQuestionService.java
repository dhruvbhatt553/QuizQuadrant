package com.example.quizquadrant.service;

import com.example.quizquadrant.dto.ExamOptionDto;
import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.PrivateOption;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.repository.PrivateQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PrivateQuestionService {

    private final PrivateQuestionRepository privateQuestionRepository;
    private final ImageService imageService;

    @Autowired
    public PrivateQuestionService(PrivateQuestionRepository privateQuestionRepository, ImageService imageService) {
        this.privateQuestionRepository = privateQuestionRepository;
        this.imageService = imageService;
    }

    public ExamQuestionDto getPrivateQuestionById(Long privateQuestionId) {
        Optional<PrivateQuestion> privateQuestionOptional = privateQuestionRepository.findById(privateQuestionId);
        PrivateQuestion privateQuestion = privateQuestionOptional.orElse(null);
        List<ExamOptionDto> optionDtos = new ArrayList<>();
        for(PrivateOption option: privateQuestion.getPrivateOptions()) {
            ExamOptionDto examOptionDto = new ExamOptionDto(
                    option.getId(),
                    option.getStatement(),
                    option.getHasImage(),
                    (option.getHasImage() ? imageService.getImageById(option.getId(), ImageTypes.PRIVATE_OPTION) : "")
            );
            optionDtos.add(examOptionDto);
        }
        return new ExamQuestionDto(
                privateQuestion.getId(),
                privateQuestion.getStatement(),
                privateQuestion.getType(),
                privateQuestion.getHasImage(),
                privateQuestion.getPositiveMarks(),
                privateQuestion.getNegativeMarks(),
                optionDtos,
                (privateQuestion.getHasImage() ? imageService.getImageById(privateQuestion.getId(), ImageTypes.PRIVATE_QUESTION) : "")
        );
    }

}
