class ExerciseRoute < ActiveRecord::Base
  validates :author_id, :title, :description, :map_info, presence: true
end
