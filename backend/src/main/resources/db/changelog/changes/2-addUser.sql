create table users
(
    id           serial,
    username     varchar(100) not null,
    password     varchar(255) not null,
    email        varchar(50)  not null,
    phone_number varchar(50),
    active       boolean      not null default true,
    primary key (id)
);

create table user_roles
(
    user_id bigint,
    role    varchar(25),
    foreign key (user_id) references users (id) on delete cascade,
    primary key (user_id, role)
);

insert into users(id, username, password, email, phone_number, active)
values (default, 'admin@meow-meow.ru', '$2a$10$GUq3UO04l1wl/x5Ezd.dFeWgM4ArB0QE/vpWM/6CATplInAvC7qRm', 'admin@meow-meow.ru',
        null, true),
       (default, 'user@meow-meow.ru', '$2a$10$GUq3UO04l1wl/x5Ezd.dFeWgM4ArB0QE/vpWM/6CATplInAvC7qRm', 'user@meow-meow.ru',
        null, true);

insert into user_roles (user_id, role)
values (1, 'ADMIN'),
       (2, 'USER')