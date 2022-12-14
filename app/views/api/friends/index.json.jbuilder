# json.user do
#     @friendship.each do |friend|
#         json.set! friend.id do 
#             json.extract! friend, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :featured, :location, :education, :work, :relationship, :phone_number, :created_at, :bio
#             json.friends friend.friend_ids
#         end 
#     end 
# end
# json.friend do
#     json.set! @friend.id do
#         json.extract! @friend, :id, :sender_id, :receiver_id, :status
#     end
# end
@friends.each do |friend|
    json.set! friend.id do 
        json.extract! json.extract! friend, :id, :email, :password, :first_name, :last_name, :gender, :day, :month, :year, :featured, :location, :education, :work, :relationship, :phone_number, :created_at, :bio
    end 
end 