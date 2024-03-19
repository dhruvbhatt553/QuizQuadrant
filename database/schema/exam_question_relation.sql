create table exam_question_relation (
    examID bigint constraint fk_exam_question_relation_examID references exam(id) on delete cascade,
    questionID bigint constraint fk_exam_question_relation_questionID references question(id) on delete cascade,
    positiveMarks int constraint nn_positiveMarks not null,
    negativeMarks int constraint nn_negativeMarks not null,
    constraint pk_exam_question_relation primary key(examID, questionID)
);