module Api
  class AlbumsController < ApplicationController
  
    def index
    
    render json: @albums
    end

    def show
    
    render json: @album
    end

    def create
    end

    def update
    end

    def destroy
    end

  end
end