@stories.each do |story| 
    json.set! story.id do 
        json.extract! story, :id, :user_id
        json.picture story.photo.url 
    end 
end 
