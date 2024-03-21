create table user (
    id bigint constraint pk_user_id primary key, 
    name varchar(20) constraint nn_name not null,
    email varchar(20) constraint nn_unique_email unique not null,
    password varchar(12) constraint nn_password not null,
    type char(1) constraint nn_type not null
);