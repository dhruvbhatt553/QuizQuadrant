package com.example.quizquadrant.service;

import com.example.quizquadrant.dto.CreateExamDto;
import com.example.quizquadrant.dto.ExamDto;
import com.example.quizquadrant.dto.ExamResponseDto;
import com.example.quizquadrant.model.*;
import com.example.quizquadrant.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final PrivateQuestionService privateQuestionService;
    private final UserService userService;
    private final ResultService resultService;

    @Autowired
    public ExamService(ExamRepository examRepository, PrivateQuestionService privateQuestionService, UserService userService, ResultService resultService) {
        this.examRepository = examRepository;
        this.privateQuestionService = privateQuestionService;
        this.userService = userService;
        this.resultService = resultService;
    }

    public Exam createExam(CreateExamDto createExamDto) {
//        TODO get userID from JWT token
        Long creatorID = 1L;    // Hardcoded temporarily ...
        User user = userService.getUserById(creatorID);

        String[] date = createExamDto.startDate().split("-");
        String[] time = createExamDto.startTime().split(":");

        Exam exam = new Exam(
                createExamDto.title(),
                LocalDateTime.of(
                        Integer.parseInt(date[0]),  // year
                        Integer.parseInt(date[1]),  // month
                        Integer.parseInt(date[2]),  // day
                        Integer.parseInt(time[0]),  // hour
                        Integer.parseInt(time[1])   // minute
                ),
                false,
                createExamDto.duration(),
                user
        );
        exam = examRepository.save(exam);

        List<PrivateQuestion> privateQuestions = privateQuestionService.createPrivateQuestions(createExamDto.questionDtos(), exam);
        exam.setPrivateQuestions(privateQuestions);

        List<User> users = userService.getUsersByEmailId(createExamDto.emailIds());
        List<Result> results = resultService.createResults(users, exam);
        exam.setExamResults(results);

        return exam;
    }

    public ExamDto getExamById(Long examId) {
//        TODO get userID from JWT token & authorize whether his email is included in EXAM ...
        Long userId = 1L;   // Hardcoded temporarily ...
        User user = userService.getUserById(userId);
        Optional<Exam> examOptional = examRepository.findById(examId);
        ExamDto examDto = null;

        if(examOptional.isPresent()) {
            Exam exam = examOptional.get();

            List<Long> questionIds = new ArrayList<>();
            for(PrivateQuestion privateQuestion: exam.getPrivateQuestions()) {
                questionIds.add(privateQuestion.getId());
            }

            List<ExamResponseDto> savedResponses = new ArrayList<>();
//            TODO fetch particular user's responses from exam.getExamResponses()
            for(ExamResponses examResponses: exam.getExamResponses()) {

            }

            examDto = new ExamDto(
                    exam.getId(),
                    exam.getTitle(),
                    exam.getDuration(),
                    exam.getStartDateTime().getYear() + "-" + exam.getStartDateTime().getMonthValue() + "-" + exam.getStartDateTime().getDayOfMonth(),
                    exam.getStartDateTime().getHour() + ":" + exam.getStartDateTime().getMinute(),
                    user.getName(),
                    user.getEmail(),
                    questionIds,
                    savedResponses
            );
        }

        return examDto;
    }
}
