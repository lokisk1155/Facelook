# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_230_223_194_442) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness',
                                                    unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'comments', force: :cascade do |t|
    t.text 'content', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'user_id'
    t.bigint 'post_id'
    t.index ['post_id'], name: 'index_comments_on_post_id'
    t.index ['user_id'], name: 'index_comments_on_user_id'
  end

  create_table 'friends', force: :cascade do |t|
    t.bigint 'sender_id', null: false
    t.bigint 'receiver_id', null: false
    t.boolean 'status', default: false, null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['receiver_id'], name: 'index_friends_on_receiver_id'
    t.index ['sender_id'], name: 'index_friends_on_sender_id'
  end

  create_table 'likes', force: :cascade do |t|
    t.boolean 'liked', default: false, null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'user_id'
    t.bigint 'post_id'
    t.index ['post_id'], name: 'index_likes_on_post_id'
    t.index ['user_id'], name: 'index_likes_on_user_id'
  end

  create_table 'posts', force: :cascade do |t|
    t.text 'content', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'user_id'
    t.index ['user_id'], name: 'index_posts_on_user_id'
  end

  create_table 'stories', force: :cascade do |t|
    t.string 'name'
    t.text 'text_story'
    t.bigint 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'background_color'
    t.string 'font_size'
    t.string 'padding_left'
    t.string 'padding_right'
    t.string 'padding_y'
    t.string 'color'
    t.string 'text_content'
    t.string 'font_type'
    t.index ['user_id'], name: 'index_stories_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', null: false
    t.string 'password_digest', null: false
    t.string 'session_token', null: false
    t.string 'first_name', null: false
    t.string 'last_name', null: false
    t.string 'day', null: false
    t.string 'month', null: false
    t.string 'year', null: false
    t.string 'gender', null: false
    t.text 'bio'
    t.boolean 'featured', default: false
    t.string 'location'
    t.string 'education'
    t.string 'work'
    t.string 'relationship'
    t.string 'phone_number'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'user_id'
    t.string 'highschool'
    t.string 'language'
    t.string 'website'
    t.string 'social_link'
    t.string 'places_lived'
    t.string 'places_worked'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['session_token'], name: 'index_users_on_session_token', unique: true
    t.index ['user_id'], name: 'index_users_on_user_id'
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'comments', 'posts'
  add_foreign_key 'comments', 'users'
  add_foreign_key 'likes', 'posts'
  add_foreign_key 'likes', 'users'
  add_foreign_key 'posts', 'users'
end
