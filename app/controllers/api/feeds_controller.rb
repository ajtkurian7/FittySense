class Api::FeedsController < ApplicationController
  def index
    feeds = Feed.all

  end
end
