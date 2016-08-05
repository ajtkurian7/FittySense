class Feed < ActiveRecord::Base
  validates :user_id, :workout_id, presence: true;

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :workout,
    class_name: "Workout",
    foreign_key: :workout_id,
    primary_key: :id
  )

  has_one(
    :exercise_route,
    through: :workout,
    source: :exercise_route
  )

  def title
    exercise_route.title
  end

  def description
    exercise_route.description
  end

  def total_time
    diff = end_time - start_time
    (diff / 3600.0).round(2)
  end


end
