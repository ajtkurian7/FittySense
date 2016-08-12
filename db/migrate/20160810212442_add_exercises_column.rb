class AddExercisesColumn < ActiveRecord::Migration
  def change
    add_column :exercise_routes, :exercise_ids, :integer, array: true
  end
end
