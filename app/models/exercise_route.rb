class ExerciseRoute < ActiveRecord::Base
  validates :author_id, :title, :description, :map_info, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )
end
