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

    # def showUserSites
    # website = Website.find_by(params[:id])
    # render json: website
    # end

    def create
      @website = Website.find_or_initialize_by({fb_id: params[:fb_id]})
        if @website.name != nil
          puts "a website for #{@website.name} already exists with ID #{@website.id}"
          render json: @website 
        else 
        @website = Website.create({
        fb_id: params[:fb_id],
        template_id: params[:template_id],
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

        if params[:contact_name]
        @website.contact_name = params[:contact_name]
        end
        if params[:html_title]
        @website.html_title = params[:html_title]
        end
        if params[:twitter_url]
        @website.twitter_url = params[:twitter_url]
        end
        if params[:domain]
        @website.domain = params[:domain]
        end
        if params[:email]
        @website.email = params[:email]
        end
        if params[:template_id]
        @website.template_id = params[:template_id]
        end
        # @website.fb_id = params[:fb_id]
        # @website.facebook_url = params[:facebook_url]
        # @website.name = params[:name]
        # @website.category = params[:category]
        # @website.about = params[:about]
        # @website.description = params[:description]
        # @website.company_overview = params[:company_overview]
        # @website.mission = params[:mission]
        # @website.year_founded = params[:year_founded]
        # @website.email = params[:email]
        # @website.phone = params[:phone]
        # @website.street = params[:street]
        # @website.city = params[:city]
        # @website.zip = params[:zip]
        # @website.country = params[:country]
        # @website.latitude = params[:latitude]
        # @website.longitude = params[:longitude]
        # @website.hours = params[:hours]
        # @website.cover_photo = params[:cover_photo]
        # @website.logo = params[:logo]

      @website.save
      render json: @website

    end

  end
end