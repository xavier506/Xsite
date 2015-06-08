class WebsitesController < ApplicationController

  def show
    @website = Website.find_by({id: params[:id]})
    @photos = Photo.where(website_id: params[:id]).to_a

    if(@photos.length == 0)
      @photo1 = @website.cover_photo
      @photo2 = @website.cover_photo
      @photo3 = @website.cover_photo
      @photo4 = @website.cover_photo
      @photo5 = @website.cover_photo
    elsif(@photos.length == 1)
      @photo1 = @photos[0].source
      @photo2 = @photos[0].source
      @photo3 = @photos[0].source
      @photo4 = @photos[0].source
      @photo5 = @photos[0].source
    elsif(@photos.length == 2)
      @photo1 = @photos[0].source
      @photo2 = @photos[1].source
      @photo3 = @photos[0].source
      @photo4 = @photos[1].source
      @photo5 = @photos[0].source
    elsif(@photos.length == 3)
      @photo1 = @photos[0].source
      @photo2 = @photos[1].source
      @photo3 = @photos[2].source
      @photo4 = @photos[0].source
      @photo5 = @photos[1].source
    elsif(@photos.length == 4)
      @photo1 = @photos[0].source
      @photo2 = @photos[1].source
      @photo3 = @photos[2].source
      @photo4 = @photos[3].source
      @photo5 = @photos[0].source
    else(@photos.length == 5)
      @photo1 = @photos[0].source
      @photo2 = @photos[1].source
      @photo3 = @photos[2].source
      @photo4 = @photos[3].source
      @photo5 = @photos[4].source
    end

    # render :default, layout: false
    if @website.template_id == 1 || nil
      render :default, layout: false
    elsif @website.template_id == 2 
      render :parallax, layout: false
    elsif @website.template_id == 3
      render :elegance, layout: false
      elsif @website.template_id == 4 
      render :professional, layout: false
    end
  end

end