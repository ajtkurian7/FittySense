class Exercise < ActiveRecord::Base
  validates :title, :num_reps, :difficulty, :author_id, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

end
