class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.integer :route_id, null: false
      t.integer :exercise_ids, array: true, null: false

      t.timestamps null: false
    end
    add_index(:workouts, :user_id)
    add_index(:workouts, :route_id)
  end

end
