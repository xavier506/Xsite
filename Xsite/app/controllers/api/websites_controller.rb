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
      fb_id: params[:fb_id],
      facebook_url: params[:facebook_url],
      name: params[:name],
      category: params[:category],
      about: params[:about],
      description: params[:description],
      company_overview: params[:company_overview],
      mission: params[:mission],
      year_founded: params[:year_founded],
      email: params[:email],
      phone: params[:phone],
      street: params[:street],
      city: params[:city],
      zip: params[:zip],
      country: params[:country],
      latitude: params[:latitude],
      longitude: params[:longitude],
      hours: params[:hours],
      cover_photo: params[:cover_photo],
      logo: params[:logo]
      })
      website.save

      render json: website
    end

    def update
    end

  end
end