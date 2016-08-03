class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      email: params[:user][:email],
      password: params[:password]
    )
    if @user
      login(user)
      render "api/users/show"
    else
      render(
        json: { base: ["Invalid username/password combination"] },
        status: 401
      )
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render(
        json: { base: ["No user signed in"] },
        status: 404
      )
  end

end
