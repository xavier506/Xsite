class CreateTemplates < ActiveRecord::Migration
  def change
    create_table :templates_tables do |t|
      t.string :name
      t.string :path

      t.timestamps null: false
    end
  end
end
