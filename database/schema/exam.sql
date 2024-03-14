create table exam (
    id bigint constraint pk_exam_id primary key,
    title varchar(200) constraint nn_exam_title not null,
    startDateTime date constraint nn_exam_startDateTime not null,
    duration int(4) constraint nn_exam_duration not null,
    createdBy bigint constraint fk_exam_createdBy references user(id)
);