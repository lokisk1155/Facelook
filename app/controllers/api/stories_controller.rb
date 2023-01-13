class Api::StoriesController < ApplicationController
    def create 
        @story = Story.new(user_id: params[:user_id])
        photo_attached = params[:story] && params[:story].has_key?(:photo)
        if photo_attached
            @story.photo.attach(params[:story][:photo])
        end 

        if !photo_attached
            @story = false 
            @story = Story.new(user_id: params[:user_id], background_color:  params[:background_color], font_size: params[:font_size], padding_left: params[:padding_left], padding_right: params[:padding_right], padding_y: params[:padding_y],color: params[:color],text_content: params[:text_content])
        end 

        if @story.save 
            return render 'api/stories/show'
        end 
    end 
end 