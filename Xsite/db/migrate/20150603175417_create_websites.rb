class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :fb_id
      t.string :name
      t.string :category
      t.text :about
      t.text :description
      t.text :company_overview
      t.text :mission
      t.string :year_founded
      t.string :email
      t.string :phone
      t.string :street
      t.string :city
      t.string :zip
      t.string :country
      t.integer :latitude
      t.integer :longitude
      t.string :hours
      t.string :cover_photo
      t.string :logo

      t.string :facebook_url
      t.string :contact_name
      t.string :twitter_url
      t.string :html_title
      t.boolean :published
      t.boolean :display_news
      t.string :domain
      t.references :template
      t.references :user

      t.timestamps null: false
    end
  end
end
