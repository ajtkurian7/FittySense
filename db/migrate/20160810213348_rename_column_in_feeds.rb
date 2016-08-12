class RenameColumnInFeeds < ActiveRecord::Migration
  def change
    rename_column :feeds, :workout_id, :route_id
  end
end
