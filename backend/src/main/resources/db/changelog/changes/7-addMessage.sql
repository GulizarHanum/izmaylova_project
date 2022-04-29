create table message(
    id serial,
    dialog_id bigint,
    sender_id bigint,
    receiver_id bigint,
    text text,
    dispatch_date_time timestamp,
    is_checked boolean,
    primary key (id),
    foreign key(dialog_id) references dialog(id) on delete cascade,
    foreign key(sender_id) references profile(id) on delete set null,
    foreign key(receiver_id) references profile(id) on delete set null
)