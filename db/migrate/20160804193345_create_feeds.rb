class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.integer :user_id, null: false
      t.integer :workout_id, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false

      t.timestamps null: false
    end

    add_index(:feeds, :user_id)
    add_index(:feeds, :workout_id)
  end
end
