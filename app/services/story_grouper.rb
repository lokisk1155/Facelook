class StoryGrouper
    def self.by_user(user_id)
      stories = Story.where(user_id: user_id).order(created_at: :desc).limit(3)
      count = stories.count
      if count < 3
        additional_stories = Story.where.not(user_id: user_id)
                                  .order(created_at: :desc)
                                  .limit(3 - count)
        stories += additional_stories
      end
      stories
    end

    def self.group_by_user
        stories_by_user = {}
        User.all.each do |user|
          user_stories = Story.where(user_id: user.id).order(created_at: :desc)
          stories_by_user[user.id] = user_stories if user_stories.exists?
        end
        stories_by_user
      end
  end