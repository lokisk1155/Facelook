class Post < ApplicationRecord
    validates :content, :user_id, presence: true
    
    belongs_to :user

    has_many :comments

    has_many :likes

    has_one_attached :photo

    def user_posts(author_id)
    end
  end
  