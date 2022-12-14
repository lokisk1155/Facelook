@users.each do |user|
    json.set! user.id do 
        json.extract! json.extract! user, :id, :first_name, :last_name 
    end 
end 