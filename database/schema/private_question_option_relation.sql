create table private_question_option_relation (
    questionID bigint constraint fk_private_question_option_relation_questionID references private_question(id) on delete cascade,
    optionID bigint constraint fk_private_question_option_relation_optionID references option(id) on delete cascade,
    isCorrect boolean constraint nn_private_question_option_relation_isCorrect not null,
    constraint pk_private_question_option_relation primary key(questionID, optionID)
);