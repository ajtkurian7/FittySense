class RemoveExerciseForeignKeys < ActiveRecord::Migration
  def change
    remove_column :exercises, :user_id, :integer
    remove_column :exercises, :route_id, :integer
  end
end
