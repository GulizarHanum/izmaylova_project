CREATE TABLE dialog(
    id serial,
    advertisement_id bigint,
    primary key(id),
    foreign key(advertisement_id) references advertisement(id) on delete set null
)