create table result (
    examID bigint constraint fk_result_examID references exam(id),
    userID bigint constraint fk_result_userID references user(id),
    marks int constraint nn_result_marks not null,
    constraint pk_result primary key(examID, userID)
);