class Api::FeedsController < ApplicationController
  def index
    user_id = params[:user_id]
    @feeds = User.find_by_id(user_id).feeds
    render :index
  end

  def create
    @feed = Feed.new(feed_params)
    debugger
    if @feed.save
      render :index
    else
      render json: @feed.errors, status: 422
    end

  end

  private

  def feed_params
    parameters = params.require(:feed).permit(:user_id, :route_id, :startTime, :endTime, :date)
    return_params = {}
    date = parameters[:date].split("-").map(&:to_i)
    start_time = parameters[:startTime].split(":").map(&:to_i)
    end_time = parameters[:endTime].split(":").map(&:to_i)

    return_params[:start_time] = DateTime.new(*(date + start_time))
    return_params[:end_time] = DateTime.new(*(date + end_time))
    return_params[:user_id] = parameters[:user_id]
    return_params[:route_id] = parameters[:route_id]

    return_params

  end
end
