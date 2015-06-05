class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
    
    t.string :name
    t.string :album_id

    t.references :website

    t.timestamps null: false

    end
  end
end
