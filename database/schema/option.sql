create table option (
    id bigint constraint pk_option_id primary key,
    statement text constraint nn_option_statement not null,
    hasImage boolean constraint nn_option_hasImage not null
);