@stories.each do |story| 
    json.set! story.id do 
        json.extract! story, :id, :user_id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color, :text_content
        json.picture story.photo.url 
    end 
end 
