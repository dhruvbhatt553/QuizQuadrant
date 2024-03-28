package com.example.quizquadrant.service;

import com.example.quizquadrant.model.User;
import com.example.quizquadrant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public List<User> getUsersByEmailId(List<String> emailIds) {
        return userRepository.findUsersByEmail(emailIds);
    }

}
