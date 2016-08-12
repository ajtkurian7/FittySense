class Feed < ActiveRecord::Base
  validates :user_id, :route_id, presence: true;

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :exercise_route,
    class_name: "ExerciseRoute",
    foreign_key: :route_id,
    primary_key: :id
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
