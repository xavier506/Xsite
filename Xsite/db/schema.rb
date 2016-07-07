# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150603180820) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "photos", force: :cascade do |t|
    t.string   "fb_photo_id"
    t.string   "source"
    t.integer  "website_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "templates", force: :cascade do |t|
    t.string   "name"
    t.string   "path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "facebook_id"
    t.string   "email"
    t.string   "name"
    t.boolean  "status"
    t.string   "auth_token"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "websites", force: :cascade do |t|
    t.string   "fb_id"
    t.string   "name"
    t.string   "category"
    t.text     "about"
    t.text     "description"
    t.text     "company_overview"
    t.text     "mission"
    t.string   "year_founded"
    t.string   "email"
    t.string   "phone"
    t.string   "street"
    t.string   "city"
    t.string   "zip"
    t.string   "country"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "hours"
    t.string   "cover_photo"
    t.string   "logo"
    t.string   "facebook_url"
    t.string   "contact_name"
    t.string   "twitter_url"
    t.string   "html_title"
    t.boolean  "published"
    t.boolean  "display_news"
    t.string   "domain"
    t.integer  "template_id"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

end
