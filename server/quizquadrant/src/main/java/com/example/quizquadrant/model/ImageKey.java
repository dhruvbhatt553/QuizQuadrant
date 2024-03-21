//package com.example.quizquadrant.model;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Embeddable;
//
//import java.io.Serializable;
//
//@Embeddable
//public class ImageKey implements Serializable {
//    @Column(name = "type")
//    private String type;
//
//    @Column(name = "refId")
//    private Long refId;
//
//    public ImageKey(String type, Long refId) {
//        this.type = type;
//        this.refId = refId;
//    }
//
//    public ImageKey() {
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
//    @Override
//    public String toString() {
//        return "ImageKey{" +
//                "type='" + type + '\'' +
//                ", refId=" + refId +
//                '}';
//    }
//}
