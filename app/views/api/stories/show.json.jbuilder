json.extract! @story, :id, :user_id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color,
              :text_content, :font_type, :created_at, :updated_at
json.picture @story.photo.url
