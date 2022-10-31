@friends.each do |friend|
    json.set! friend.id do 
        json.extract! friend, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :featured, :location, :education, :work, :relationship, :phone_number, :created_at, :bio
    end 
end 