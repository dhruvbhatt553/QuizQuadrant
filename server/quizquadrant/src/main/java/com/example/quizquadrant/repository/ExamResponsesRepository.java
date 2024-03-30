package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.ExamResponseKey;
import com.example.quizquadrant.model.ExamResponses;
import com.example.quizquadrant.model.PrivateQuestion;
import com.example.quizquadrant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResponsesRepository extends JpaRepository<ExamResponses, ExamResponseKey> {

    public ExamResponses findExamResponsesByUserAndPrivateQuestion(User user, PrivateQuestion privateQuestion);

    @Transactional
    @Modifying
    @Query("DELETE FROM ExamResponses er WHERE er.user = :user AND er.privateQuestion in :privateQuestions")
    public void deleteExamResponsesByUserAndAndPrivateQuestion(User user, List<PrivateQuestion> privateQuestions);

}
