module Api
  class WebsitesController < ApplicationController
  
    def index
    websites = Website.all
    render json: websites
    end

    def show
    website = Website.find(params[:id])
    render json: website
    end

    def create
      website = Website.create({
      name: params[:name], description: params[:description], about: params[:about], logo: params[:logo], facebook_url: params[:facebook_url], facebook_id: params[:facebook_id]})
      website.save

      render json: event
    end

    def update
    end

  end
end