# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


route1 = ExerciseRoute.create(
  title: "Route 1",
  description: "Test Route 1",
  map_info: {test: 1}.to_json,
  author_id: 1
)

route2 = ExerciseRoute.create(
  title: "Route 2",
  description: "Test Route 2",
  map_info: {test: 1}.to_json,
  author_id: 1
)

route3 = ExerciseRoute.create(
  title: "Route 3",
  description: "Test Route 3",
  map_info: {test: 1}.to_json,
  author_id: 1
)

exercise1 = Exercise.create(
  title: "Push Ups",
  description: "Normal Push Ups",
  num_reps: 10,
  difficulty: 1,
  author_id: -1
)

exercise2 = Exercise.create(
  title: "Burpees",
  description: "Also called Up-down",
  num_reps: 15,
  difficulty: 2,
  author_id: -1
)

exercise3 = Exercise.create(
  title: "Mountain Climbers",
  description: "Running in Place",
  num_reps: 10,
  difficulty: 2,
  author_id: -1
)

workout1 = Workout.create(
  user_id: 1,
  route_id: route1.id,
  exercise_ids: [exercise1.id, exercise2.id]
)

workout2 = Workout.create(
  user_id: 1,
  route_id: route1.id,
  exercise_ids: [exercise2.id, exercise3.id]
)

feed1 = Feed.create(
  user_id: 1,
  workout_id: 1,
  start_time: DateTime.new(2016, 4,8,20,0),
  end_time: DateTime.new(2016, 4, 8, 21,0)
)

feed2 = Feed.create(
  user_id: 1,
  workout_id: 2,
  start_time: DateTime.new(2016, 8,4,20,0),
  end_time: DateTime.new(2016, 8, 4, 21,0)
)
