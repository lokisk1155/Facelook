class Like < ApplicationRecord
    validates :liked, inclusion: { in: [true, false] }, presence: true
  
    belongs_to :user
  
    belongs_to :post
  end
  