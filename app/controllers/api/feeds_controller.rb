class Api::FeedsController < ApplicationController
  def index
    user_id = params[:user_id]
    @feeds = User.find_by_id(user_id).feeds.includes(:workout)
    render :index
  end
end
