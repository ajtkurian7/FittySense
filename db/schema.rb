# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160810213348) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exercise_routes", force: :cascade do |t|
    t.string   "title",        null: false
    t.text     "description",  null: false
    t.json     "map_info",     null: false
    t.integer  "author_id",    null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "exercise_ids",              array: true
  end

  add_index "exercise_routes", ["author_id"], name: "index_exercise_routes_on_author_id", using: :btree

  create_table "exercises", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "num_reps",    null: false
    t.integer  "difficulty",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "author_id",   null: false
  end

  add_index "exercises", ["author_id"], name: "index_exercises_on_author_id", using: :btree

  create_table "feeds", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "route_id",   null: false
    t.datetime "start_time", null: false
    t.datetime "end_time",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "feeds", ["route_id"], name: "index_feeds_on_route_id", using: :btree
  add_index "feeds", ["user_id"], name: "index_feeds_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "fname",           null: false
    t.string   "lname",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "pic_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
