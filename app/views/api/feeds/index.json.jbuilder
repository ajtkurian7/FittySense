json.array! @feeds do |feed|
  json.title feed.title
  json.description feed.description
  json.start_time feed.start_time.strftime('%r')
  json.total_time feed.total_time
  json.date feed.start_time.strftime("%A, %B %y, %Y")
end
