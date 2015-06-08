class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|

    t.string :fb_photo_id
    t.string :source
    t.integer :website_id

    t.timestamps null: false

    end
  end
end
