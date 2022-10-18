@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :content, :user_id, :created_at, :updated_at
    end
end