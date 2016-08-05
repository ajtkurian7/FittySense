class AddAuthorIdToExercise < ActiveRecord::Migration
  def change
    add_column :exercises, :author_id, :integer, null: false
    add_index :exercises, :author_id
  end
end
