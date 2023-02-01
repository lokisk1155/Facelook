class Story < ApplicationRecord
  validates :user_id, presence: true
  belongs_to :user
  has_one_attached :photo

  def self.by_user(user_id)
    stories = Story.where(user_id:).order(created_at: :desc).limit(3)
    count = stories.count
    if count < 3
      additional_stories = Story.where.not(user_id:)
                                .order(created_at: :desc)
                                .limit(3 - count)
      stories += additional_stories
    end
    stories
  end

  def self.group_by_user(user_id)
    Story.where(user_id: user_id)
    .order(created_at: :desc)
    .group_by(&:user_id)
  end


end




end
  # def self.by_user(user_id)
  #   Story.where("user_id = ? OR user_id != ?", user_id, user_id).order(created_at: :desc).limit(3)
  # end
    # def self.group_by_user(user_id)
  #   stories_by_user = {}
  #   user_stories = Story.where(user_id:).order(created_at: :desc)
  #   stories_by_user[user_id] = user_stories if user_stories.exists?
  #   stories_by_user
  # end