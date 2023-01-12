class Api::StoriesController < ApplicationController
    def create 
        photo_attached = params[:story] && params[:story].has_key?(:photo)
        if photo_attached
            @story = Story.new(user_id: params[:user_id])
            @story.photo.attach(params[:story][:photo])
            if @story.save 
                @stories = Story.all
                render 'api/stories/index'
            end 
        else 
            @story = Story.new(style_params)
            if @story.save 
                @stories = Story.all
                render 'api/stories/index'
            end 
        end

        private 

        def style_params 
            params.require(:story).permit(:user_id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color, :text_content)
        end 
    end 
end 