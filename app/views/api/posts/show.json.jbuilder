# frozen_string_literal: true

json.extract! @post, :id, :content, :user_id, :created_at, :updated_at
json.picture @post.photo.url
