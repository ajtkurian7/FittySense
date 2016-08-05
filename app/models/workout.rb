class Workout < ActiveRecord::Base
  validates :user_id, :route_id, :exercise_ids, presence: true

  has_many(
    :feeds,
    class_name: "Feed",
    foreign_key: :workout_id,
    primary_key: :id
  )

  belongs_to :user

  belongs_to(
    :exercise_route,
    class_name: "ExerciseRoute",
    foreign_key: :route_id,
    primary_key: :id
  )


end
