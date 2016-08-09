class Api::ExercisesController < ApplicationController
  def index
    @user = User.find_by_id(params[:user_id])
    @exercises = @user.exercises + Exercise.where(author_id: -1)
    render :index
  end
end
