json.array! @exercises do |exercise|
  json.id exercise.id
  json.title exercise.title
  json.description exercise.description
  json.difficulty exercise.difficulty
  json.num_reps exercise.num_reps
  json.author_id exercise.author_id
end
