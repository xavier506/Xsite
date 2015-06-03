class Website < ActiveRecord::Base
  belongs_to :user
  has_many :albums
  has_one :template
end