create table feedback(
    id serial,
    sender_id bigint not null,
    recipient_id bigint not null,
    text text,
    send_date_time timestamp,
    mark decimal,
    primary key(id),
    foreign key(sender_id) references profile(id) on delete cascade,
    foreign key(recipient_id) references profile(id) on delete cascade
)
