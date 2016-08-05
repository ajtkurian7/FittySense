class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.integer :user_id, null: false
      t.integer :route_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :num_reps, null: false
      t.integer :difficulty, null: false

      t.timestamps null: false
    end

    add_index(:exercises, :user_id)
    add_index(:exercises, :route_id)
  end
end
