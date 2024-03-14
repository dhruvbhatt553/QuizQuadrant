create table subject (
    id bigint constraint pk_subject_id primary key,
    subName varchar(20) constraint nn_subName not null
);