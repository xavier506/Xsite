class WebsitesController < ApplicationController

  def show
    @website = Website.find_by({id: params[:id]})
    # render :default, layout: false
    if @website.template_id == 1 || nil
      render :default, layout: false
    elsif @website.template_id == 2 
      render :parallax, layout: false
    elsif @website.template_id == 3
      render :ellegance, layout: false
      elsif @website.template_id == 4 
      render :professional, layout: false
    end
  end

end