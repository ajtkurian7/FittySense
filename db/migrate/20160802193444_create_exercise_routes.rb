class CreateExerciseRoutes < ActiveRecord::Migration
  def change
    create_table :exercise_routes do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.json :map_info, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index(:exercise_routes, :author_id)
  end
end
