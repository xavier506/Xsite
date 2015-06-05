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
      @website = Website.find_or_initialize_by({fb_id: params[:fb_id]})
        if @website.name != nil
          puts "a website for #{@website.name} already exists with ID #{@website.id}"
          render json: @website 
        else 
        @website = Website.create({
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
        if @website.save
          puts "new website saved"
          render json: @website
        else 
          puts "Website not saved!"
          render json: @website
        end
      end
    end

    def update

      @website = Website.find_by(id: params[:id])

      @website.update(template_id: params[:template_id])

      render json: @website

    end

  end
end