@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :featured, :location, :education, :work, :relationship, :phone_number, :created_at, :bio
        json.friends user.friend_ids
        json.profilePicUrl @user.profile_pic.url
    end 
end 