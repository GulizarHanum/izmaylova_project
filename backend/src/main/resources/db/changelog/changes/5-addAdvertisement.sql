create table advertisement(
    id serial,
    name varchar(100) not null,
    category varchar(100) not null,
    subcategory varchar(100) not null,
    cost decimal not null,
    description text not null,
    city varchar(50) not null,
    street varchar(100),
    house varchar(10),
    create_date_time timestamp,
    seller_id bigint not null,
    is_closed boolean not null,
    sell_date_time timestamp,
    primary key(id),
    foreign key(seller_id) references profile(id) on delete cascade,
    foreign key(category, subcategory) references category_subcategories(category_name, subcategory) on delete set null
);

create table advertisement_photos(
    id serial,
    advertisement_id bigint,
    photo bytea,
    foreign key(advertisement_id) references advertisement(id) on delete set null,
    primary key(id)
)