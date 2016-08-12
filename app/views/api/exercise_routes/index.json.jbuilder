json.array! @exercise_routes do |route|
  json.id route.id
  json.title route.title
  json.description route.description
  json.map_info route.map_info
  json.exercise_ids route.exercise_ids
  json.created_at route.created_at.strftime("%A, %B %y, %Y %r")
end
