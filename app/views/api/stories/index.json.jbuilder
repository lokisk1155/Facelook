# frozen_string_literal: true

@stories.each do |user_id, stories|
  json.set! user_id do
    json.array! stories do |story|
      json.extract! story, :id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color,
                    :text_content, :user_id, :font_type, :created_at, :updated_at
      json.picture story.photo.url
    end
  end
end
