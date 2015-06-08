class SessionsController < ApplicationController

    def show
    @user = User.find_by({id: session[:user_id]})
    render json: @user
    end

    def create
      @user = User.find_by({facebook_id: params[:user_id]})
      session[:user_id] = @user.id
      render json: @user
    end

    def destroy
      # user logs out and session gets destroyed
      session[:user_id] = nil
      redirect_to root_path
    end

end