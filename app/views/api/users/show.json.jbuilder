# frozen_string_literal: true

json.user do
  json.extract! @user, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :featured,
                :location, :education, :work, :relationship, :phone_number, :created_at, :highschool, :website, :language, :social_link, :places_lived, :bio, :places_worked
  json.friends @user.friend_ids
  json.profile_picture @user.profile_pic.url
  json.cover_photo @user.cover_photo.url
end
