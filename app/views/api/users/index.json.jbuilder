@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :user_id
    end 
end 