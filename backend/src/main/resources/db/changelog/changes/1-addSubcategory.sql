create table category(
    name    varchar(100) not null,
    primary key(name)
);

create table category_subcategories(
    category_name varchar(100) not null,
    subcategory   varchar(100) not null,
    primary key   (category_name, subcategory),
    foreign key(category_name) references category(name) on delete cascade
);

insert into category(name)
values ('ELECTRONICS'),
       ('CLOTHES'),
       ('REALTY'),
       ('ANIMALS'),
       ('TRANSPORT'),
       ('OTHER');