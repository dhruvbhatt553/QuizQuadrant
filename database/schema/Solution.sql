create table solution (
    id bigint constraint pk_solution_id primary key,
    statement longtext constraint nn_solution_statement not null,
    hasImage boolean constraint nn_solution_hasImage not null
);