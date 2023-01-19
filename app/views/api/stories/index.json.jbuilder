# @stories.each do |story| 
#     json.set! story.id do 
#         json.extract! story, :id, :user_id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color, :text_content
#         json.picture story.photo.url 
#     end 
# end 


json.stories @stories do |user_id, stories|
    json.set! user_id do
      json.array! stories do |story|
        json.set! story.id do
          json.extract! story, :id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color, :text_content
          json.picture story.photo.url
        end
      end
    end
  end