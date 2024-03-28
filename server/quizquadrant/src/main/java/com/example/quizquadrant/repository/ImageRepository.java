package com.example.quizquadrant.repository;

import com.example.quizquadrant.model.Image;
import com.example.quizquadrant.model.ImageKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, ImageKey> {
}
