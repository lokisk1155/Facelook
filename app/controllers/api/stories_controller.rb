class Api::StoriesController < ApplicationController
  def create
    @story
    if params[:story] && params[:story].has_key?(:photo)
      @story = Story.new(user_id: current_user.id)
      @story.photo.attach(params[:story][:photo])
    else
      @story = false
      @story = Story.new(user_id: current_user.id, background_color: params[:background_color],
                         font_size: params[:font_size], padding_left: params[:padding_left], padding_right: params[:padding_right], padding_y: params[:padding_y], color: params[:color], text_content: params[:text_content])
    end

    return unless @story.save

  end

    def index
        @stories = Story.all
        @homepage = false
        @all = false 
        if params[:limit]
          @stories = StoryGrouper.by_user(current_user.id)
          @homepage = true
        else
          @storiesNestedUnderUser = {}
          user_ids = Story.select(:user_id).distinct.pluck(:user_id)
          user_ids.each do |user_id|
            @storiesNestedUnderUser.merge!(StoryGrouper.group_by_user(user_id))
          end
          @all = true
          @stories = @storiesNestedUnderUser
        end
        render 'api/stories/index'
    end
end 

