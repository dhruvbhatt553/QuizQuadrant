//package com.example.quizquadrant.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "image")
//public class Image {
//
//    @EmbeddedId
//    private ImageKey id;
//
//    @MapsId("id")
//    private String type;
//
//    @MapsId("refId")
//    private Long refId;
//
//    private String imageUrl;
//
//    public Image(String type, Long refId, String imageUrl) {
//        this.type = type;
//        this.refId = refId;
//        this.imageUrl = imageUrl;
//    }
//
//    public Image() {
//    }
//
//    public ImageKey getId() {
//        return id;
//    }
//
//    public void setId(ImageKey id) {
//        this.id = id;
//    }
//
//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public Long getRefId() {
//        return refId;
//    }
//
//    public void setRefId(Long refId) {
//        this.refId = refId;
//    }
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }
//
//    @Override
//    public String toString() {
//        return "Image{" +
//                "id=" + id +
//                ", type='" + type + '\'' +
//                ", refId=" + refId +
//                ", imageUrl='" + imageUrl + '\'' +
//                '}';
//    }
//}
