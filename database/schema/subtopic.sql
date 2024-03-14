create table subtopic (
    id bigint,
    subtopicName varchar(20) constraint nn_subtopicName not null,
    subjectID bigint constraint fk_subjectID references subject(id) on delete cascade,
    constraint pk_subtopics primary key(id, subjectID)
);