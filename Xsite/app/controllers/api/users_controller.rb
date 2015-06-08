module Api
  class UsersController < ApplicationController

    def create
      @user = User.find_or_initialize_by({facebook_id: params[:facebook_id]})
        @user.facebook_id = params[:facebook_id]
        @user.name = params[:name]
        @user.email = params[:email]
        @user.save
      render json: @user
    end

    def update
      @user = User.find(params[:id])
        @user.facebook_id = params[:facebook_id]
        @user.name = params[:name]
        @user.email = params[:email]
      @user.save
        redirect_to '/#websites/' + params[:website_id]
    end

    def show
      @user = User.find(params[:id])

      render json: @user
    end


  end
end