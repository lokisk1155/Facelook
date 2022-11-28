json.friend do
    json.set! @friend.id do
        json.extract! @friend, :id, :sender_id, :receiver_id, :status
    end
end