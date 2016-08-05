# Schema Information


## ExerciseRoutes
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
difficulty  | integer   | not null

## Workouts
column name | data type | details
------------|-----------|---------------------
id          |  integer  | not null, primary key
user_id     |  integer  | not null, foreign key (references users), indexed
route_id    |  integer  | not null, foreign key (references route), indexed
exercise_ids|  integer  | not null, foreign key (exercises), array

## Follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed
followee_id | integer   | not null, foreign key (references users), indexed

## Feed
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key (references users), indexed
workout_id    | integer   | not null, foreign key (references route), indexed
start_time    | datetime  |
end_time      | datetime  |

NB: All this stuff is already calculated.  Leave this last!!!!!
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
