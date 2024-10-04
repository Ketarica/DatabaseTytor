CREATE DATABASE gamedb;

CREATE TABLE games(
game_id SERIAL PRIMARY KEY,
name  VARCHAR(255),
description VARCHAR(255),
release VARCHAR(255),
score VARCHAR(255));
