class Api::ExerciseRoutesController < ApplicationController
  def index
    user_id = params[:user_id]
    @exercise_routes = User.find_by_id(user_id).exercise_routes
    render :index
  end
end
