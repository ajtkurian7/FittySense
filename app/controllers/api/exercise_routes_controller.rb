class Api::ExerciseRoutesController < ApplicationController
  def index
    user_id = params[:user_id]
    @exercise_routes = User.find_by_id(user_id).exercise_routes
    render :index
  end

  def create
    @exercise_route = ExerciseRoute.new(route_params)
    @exercise_route.map_info = params[:route][:map_info].to_json
    @exercise_route.exercise_ids = params[:route][:exercise_ids].map(&:to_i)

    if @exercise_route.save
      render :index
    else
      render json: @exercise_route.errors, status: 422
    end
  end

  def destroy
    @route = ExerciseRoute.find_by_id(params[:route_id])
    @route.destroy!
    render json: @route
  end

  private

  def route_params
    params.require(:route).permit(:title, :description, :map_info, :exercise_ids, :author_id)
  end
end
