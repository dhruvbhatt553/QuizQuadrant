create table question_option_relation (
    questionID bigint constraint fk_question_option_relation_questionID references question(id) on delete cascade,
    optionID bigint constraint fk_question_option_relation_optionID references option(id) on delete cascade,
    isCorrect boolean constraint nn_question_option_relation_isCorrect not null,
    constraint pk_question_option_relation primary key(questionID, optionID)
);