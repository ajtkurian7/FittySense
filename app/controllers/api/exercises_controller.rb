class Api::ExercisesController < ApplicationController
  def index
    @user = User.find_by_id(params[:user_id])
    @exercises = @user.exercises + Exercise.where(author_id: -1)
    render :index
  end

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      render "api/exercises/index"
    else
      render json: @exercise.errors, status: 422
    end

  end

  def update
    @exercise = Exercise.find_by_id(params[:id])
    if @exercise.update(exercise_params)
      render "api/exercises/index"
    else
      render json: @exercise.errors, status: 422
    end
  end


  def destroy
    @exercise = Exercise.find_by_id(params[:exercise_id])
    @exercise.destroy!
    render json: @exercise
  end
  private

  def exercise_params
    params.require(:exercise).permit(
      :title,
      :description,
      :num_reps,
      :difficulty,
      :author_id
    )
  end
end
