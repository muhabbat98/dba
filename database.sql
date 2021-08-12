create extension pgcrypto;
create database dba;
-- 01 users
create table users (
    user_id serial not null primary key,
    username varchar(64) unique not null,
    password varchar(128) not null,
    full_name varchar(128),
    is_admin boolean default false
);
INSERT INTO users(username, password, is_admin) VALUES('bmp98', crypt('123', gen_salt('bf')), true);
-- SELECT username, is_admin, user_id FROM users WHERE username=$1, password=crypt($2, password), is_admin=$3;
-- 02 covers
create table covers (
    cover_id serial not null primary key,
    filename varchar(128) not null,
    mimetype varchar(128),
    size varchar(64)
);

-- 03 files
create table files (
    file_id serial not null primary key,
    filename varchar(128) not null,
    mimetype varchar(128),
    size varchar(64)
);

-- 04 Science
    -- degree
-- 1 Diplom
-- 2 Magistr
-- 3 PHD
    -- resource_type
-- 1 digital,
-- 2 physical,
-- 3 digital and physical
create table science_literature (
    science_literature_id serial not null primary key,
    degree smallint not null,
    file_id int references files(file_id),
    cover_id int references covers(cover_id),
    name varchar(128) not null,
    author varchar(128),
    keywords varchar (256),
    description text,
    resource_type int,
    language varchar(32),
    date varchar (32)
);

-- 05 foriegn department
    -- resource_type
-- 1 digital,
-- 2 physical,
-- 3 digital and physical
create table foriegn_literature (
    foriegn_literature_id serial not null primary key,
    file_id int references files(file_id),
    cover_id int references covers(cover_id),
    name varchar(128) not null,
    author varchar(128),
    keywords varchar (256),
    description text,
    resource_type int,
    language varchar(32),
    right_holders varchar(128),
    date varchar (32)
);

-- 06 Journals department
    -- resource_type
-- 1 digital,
-- 2 physical,
-- 3 digital and physical
create table journals_literature (
    foriegn_literature_id serial not null primary key,
    file_id int references files(file_id),
    cover_id int references covers(cover_id),
    name varchar(128) not null,
    keywords varchar (256),
    resource_type int,
    language varchar(32),
    serial_number int not null,
    year int not null,
    date varchar (32)
);
