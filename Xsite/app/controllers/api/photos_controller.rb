module Api
  class PhotosController < ApplicationController
  
    def index
    @photos = Photo.where(website_id: params[:website_id]).to_a
    render json: @photos
    end

    def show
    @photo = Photo.find(params[:id])
    render json: @photos
    end

    def create
        @photo = Photo.find_or_initialize_by({fb_photo_id: params[:fb_photo_id]})
        @photo.fb_photo_id = params[:fb_photo_id]
        @photo.source = params[:source]
        @photo.website_id = params[:website_id]

        if @photo.save
          puts "new photo saved :)"
          render json: @photo
        else 
          puts "photo not saved! :("
          render json: @photo
        end
    end

    def update
    end

    def destroy
    end

  end
end