class Api::UsersController < ApplicationController
  def create
    if params[:user][:password] != params[:user][:password]
      render json: ["Passwords don't match"]
    else
      @user = User.new(user_params)

      if @user.save
        login(@user)
        render "api/users/show"
      else
        render json: @user.errors, status: 422
      end
    end
  end

  private

  def user_params
    params.require(:user).permit([:email, :fname, :lname, :password])
  end
end
