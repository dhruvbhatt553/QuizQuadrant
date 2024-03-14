create table user (
    id bigint constraint pk_user_id primary key, 
    name varchar(20) constraint nn_unique_name unique not null,
    email varchar(20) constraint nn_email not null,
    password varchar(12) constraint nn_password not null,
    type char(1) constraint nn_type not null
);