package com.example.quizquadrant.service;

import com.example.quizquadrant.model.Subject;
import com.example.quizquadrant.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public Subject getSubjectById(Long subjectId) {
        Optional<Subject> subjectOptional = subjectRepository.findById(subjectId);
        return subjectOptional.orElse(null);
    }
}
