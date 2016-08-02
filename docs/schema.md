# Schema Information


## Routes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | text      |
map_info    | JSON      | not null

## Exercises
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
route_id    | integer   | not null, foreign key (references route), indexed
title       | string    | not null
description | text      |
num_reps    | integer   | not null
difficulty  | integer   | not null, between (1-10)

## Follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed
followee_id | integer   | not null, foreign key (references users), indexed

## Stats
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [user_id]
completed_routes  | integer   | not null
completed_exercises   | integer   | not null
time_ran    | datetime  | not null
power_score | integer   | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
