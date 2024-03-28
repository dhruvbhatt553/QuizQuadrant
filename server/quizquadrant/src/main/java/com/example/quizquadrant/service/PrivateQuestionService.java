package com.example.quizquadrant.service;

import com.example.quizquadrant.dto.CreateQuestionDto;
import com.example.quizquadrant.dto.ExamOptionDto;
import com.example.quizquadrant.dto.ExamQuestionDto;
import com.example.quizquadrant.model.*;
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
    private final PrivateSolutionService privateSolutionService;
    private final SubtopicService subtopicService;
    private final PrivateOptionService privateOptionService;

    @Autowired
    public PrivateQuestionService(PrivateQuestionRepository privateQuestionRepository, ImageService imageService, PrivateSolutionService privateSolutionService, SubtopicService subtopicService, PrivateOptionService privateOptionService) {
        this.privateQuestionRepository = privateQuestionRepository;
        this.imageService = imageService;
        this.privateSolutionService = privateSolutionService;
        this.subtopicService = subtopicService;
        this.privateOptionService = privateOptionService;
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

    public List<PrivateQuestion> createPrivateQuestions(List<CreateQuestionDto> createQuestionDtos, Exam exam) {
        List<PrivateQuestion> privateQuestions = new ArrayList<>();

        for(CreateQuestionDto createQuestionDto: createQuestionDtos) {
            PrivateSolution privateSolution = privateSolutionService.createPrivateSolution(
                    !createQuestionDto.solutionImageURL().isEmpty(),
                    createQuestionDto.solutionStatement()
            );

            Subtopic subtopic = subtopicService.getSubtopicById(
                    createQuestionDto.subjectId(),
                    createQuestionDto.subtopicId()
            );

            PrivateQuestion privateQuestion = new PrivateQuestion(
                    createQuestionDto.questionStatement(),
                    createQuestionDto.type(),
                    !createQuestionDto.questionImageURL().isEmpty(),
                    createQuestionDto.positiveMarks(),
                    createQuestionDto.negativeMarks(),
                    subtopic,
                    exam,
                    privateSolution
            );
            privateQuestion = privateQuestionRepository.save(privateQuestion);

            PrivateOption privateOptionA = privateOptionService.createPrivateOption(
                    createQuestionDto.optionAStatement(),
                    !createQuestionDto.optionAImageURL().isEmpty(),
                    createQuestionDto.correctAnswer().contains("A"),
                    privateQuestion
            );

            PrivateOption privateOptionB = privateOptionService.createPrivateOption(
                    createQuestionDto.optionBStatement(),
                    !createQuestionDto.optionBImageURL().isEmpty(),
                    createQuestionDto.correctAnswer().contains("B"),
                    privateQuestion
            );

            PrivateOption privateOptionC = privateOptionService.createPrivateOption(
                    createQuestionDto.optionCStatement(),
                    !createQuestionDto.optionCImageURL().isEmpty(),
                    createQuestionDto.correctAnswer().contains("C"),
                    privateQuestion
            );

            PrivateOption privateOptionD = privateOptionService.createPrivateOption(
                    createQuestionDto.optionDStatement(),
                    !createQuestionDto.optionDImageURL().isEmpty(),
                    createQuestionDto.correctAnswer().contains("D"),
                    privateQuestion
            );

            if(privateQuestion.getHasImage()) {
                Image imgQues = imageService.createImage(ImageTypes.PRIVATE_QUESTION, privateQuestion.getId(), createQuestionDto.questionImageURL());
            }
            if(privateSolution.getHasImage()) {
                Image imgSol = imageService.createImage(ImageTypes.PRIVATE_SOLUTION, privateSolution.getId(), createQuestionDto.solutionImageURL());
            }
            if(privateOptionA.getHasImage()) {
                Image imgOptionA = imageService.createImage(ImageTypes.PRIVATE_OPTION, privateOptionA.getId(), createQuestionDto.optionAImageURL());
            }
            if(privateOptionB.getHasImage()) {
                Image imgOptionB = imageService.createImage(ImageTypes.PRIVATE_OPTION, privateOptionB.getId(), createQuestionDto.optionBImageURL());
            }
            if(privateOptionC.getHasImage()) {
                Image imgOptionC = imageService.createImage(ImageTypes.PRIVATE_OPTION, privateOptionC.getId(), createQuestionDto.optionCImageURL());
            }
            if(privateOptionD.getHasImage()) {
                Image imgOptionD = imageService.createImage(ImageTypes.PRIVATE_OPTION, privateOptionD.getId(), createQuestionDto.optionDImageURL());
            }

            privateQuestions.add(privateQuestion);
        }

        return privateQuestions;
    }

}
