@users.each do |user|
    json.set! user.id do 
        json.extract! json.extract! user, :id, :first_name, :last_name 
        json.profile_picture user.profile_pic.url
    end 
end 