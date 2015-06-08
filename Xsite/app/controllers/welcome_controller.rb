class WelcomeController < ApplicationController
 
  def index   
    if session[:user_id]
    @user = User.find(session[:user_id])
    @user_sites = Website.where(user_id: @user.id).to_a
    end

    render :index
  end
end