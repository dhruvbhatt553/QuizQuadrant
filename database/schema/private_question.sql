create table private_question (
    id bigint constraint pk_private_question_id primary key,
    statement longtext constraint nn_private_question_statement not null,
    type char(3) constraint nn_private_question_type not null,
    solutionId bigint constraint fk_private_question_solution references solution(id) on delete cascade,
    hasImage boolean constraint nn_private_question_hasImage not null,
    subtopicID bigint constraint fk_private_question_subtopicID references subtopic(id) on delete cascade
);