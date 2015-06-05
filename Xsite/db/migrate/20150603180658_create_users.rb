class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    
    t.string :facebook_id
    t.string :email
    t.string :name
    t.boolean :status

    t.string :auth_token

    t.timestamps null: false
    end
  end
end
