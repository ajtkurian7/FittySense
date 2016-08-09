json.array! @exercises do |exercise|
  json.title exercise.title
  json.description exercise.description
  json.difficulty exercise.difficulty
  json.num_reps exercise.num_reps
  json.author @user.fname + ' ' + @user.lname
end
