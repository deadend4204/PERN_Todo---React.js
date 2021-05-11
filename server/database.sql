CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description varchar(255)
);

create table memories(mem_id SERIAL PRIMARY KEY,title varchar(100),message varchar(100),creator int,file varchar(150),likeCount int default 0,createdAt TIMESTAMP)

ALTER TABLE memories ADD COLUMN tags varchar(200);
ALTER TABLE memories ALTER COLUMN createdAt SET DEFAULT now();

insert into memories(title,message,creator,file,tags) values('Picnic','It was wonderful',1,'out.jpg','picnic,family,fun');