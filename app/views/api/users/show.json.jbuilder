json.user do
    json.extract! @user, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured, :location, :education, :work, :relationship, :phone_number, :created_at
end