class Friend < ApplicationRecord
    validates :sender_id, :receiver_id, presence: true
    
    belongs_to :user,
        foreign_key: :sender_id,
        class_name: :User

    belongs_to :friend,
        foreign_key: :receiver_id,
        class_name: :User

end
