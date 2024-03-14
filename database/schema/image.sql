create table image (
    type char(1),
    refID bigint constraint,
    imageURL varchar(65535) constraint nn_image_imageURL not null,
    constraint pk_image primary key(type, refID)
);