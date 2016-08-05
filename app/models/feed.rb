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

  


end
