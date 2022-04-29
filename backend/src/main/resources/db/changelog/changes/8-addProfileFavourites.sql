create table profile_favourites
(
    profile_id       bigint,
    advertisement_id bigint,
    foreign key (profile_id) references profile (id) on delete set null,
    foreign key (advertisement_id) references advertisement (id) on delete set null,
    primary key (profile_id, advertisement_id)
)