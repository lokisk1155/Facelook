json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :day, :month, :year, :created_at, :updated_at
end