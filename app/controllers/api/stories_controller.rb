class Api::StoriesController < ApplicationController
    def create 
        @story 
        if params[:story] && params[:story].has_key?(:photo)
            @story = Story.new(user_id: params[:user_id])
            @story.photo.attach(params[:story][:photo])
        else
            @story = false 
            @story = Story.new(user_id: params[:user_id], background_color:  params[:background_color], font_size: params[:font_size], padding_left: params[:padding_left], padding_right: params[:padding_right], padding_y: params[:padding_y],color: params[:color],text_content: params[:text_content])
        end 

        if @story.save 
            return render 'api/stories/show'
        end 
    end 

    def index 
        @stories = Story.all
        if params[:limit]
            @stories = Story.where(user_id: current_user.id).limit(3)
            if @stories.length > 3
                @stories = Story.all.last(3)
            end 
        end 
        render 'api/stories/index'
    end 
end 