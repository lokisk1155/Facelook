class Api::StoriesController < ApplicationController
  def create
    @story
    if params[:story] && params[:story].has_key?(:photo)
      @story = Story.new(user_id: current_user.id, padding_right: params[:story][:styles][:padding_right], padding_left: params[:story][:styles][:padding_left], color: params[:story][:styles][:color], text_content: params[:story][:styles][:text_content], font_type: params[:story][:styles][:font_type], font_size: params[:story][:styles][:font_size])
      @story.photo.attach(params[:story][:photo])
    else
      @story = false
      @story = Story.new(user_id: current_user.id, background_color: params[:background_color],
                         font_size: params[:font_size], padding_left: params[:padding_left], padding_right: params[:padding_right], padding_y: params[:padding_y], color: params[:color], text_content: params[:text_content], font_type: params[:font_type])
    end

    return unless @story.save

  end

  def index
    limit = params[:limit].to_i
    @storiesNestedUnderUser = {}
    user_ids = Story.select(:user_id).distinct.pluck(:user_id)
    user_ids.each do |user_id|
      if limit > 0
        difference = limit - @storiesNestedUnderUser.values.flatten.length
        if (difference <= 0) 
          break 
        end 
      end 
      @storiesNestedUnderUser.merge!(Story.group_by_user(user_id))
    end
    @stories = @storiesNestedUnderUser
    render 'api/stories/index'
  end  

  private 

end 

