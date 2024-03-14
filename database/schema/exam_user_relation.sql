create table exam_user_relation (
    examID bigint constraint fk_exam_question_relation_examID references exam(id),
    userID bigint constraint fk_exam_question_relation_userID references user(id),
    constraint pk_exam_question_relation primary key(examID, userID)
);