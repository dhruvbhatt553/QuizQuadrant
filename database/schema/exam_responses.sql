create table exam_responses (
    examID bigint constraint fk_exam_responses_examID references exam(id),
    questionID bigint constraint fk_exam_responses_questionID references question(id),
    userID bigint constraint fk_exam_responses_userID references user(id),
    optionAMarked boolean constraint nn_exam_responses_optionAMarked not null,
    optionBMarked boolean constraint nn_exam_responses_optionBMarked not null,
    optionCMarked boolean constraint nn_exam_responses_optionCMarked not null,
    optionDMarked boolean constraint nn_exam_responses_optionDMarked not null,
    constraint pk_exam_responses primary key(examID, questionID, userID)
);