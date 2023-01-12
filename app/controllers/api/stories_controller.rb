class Api::StoriesController < ApplicationController
    def create 
        @story = Story.new(user_id: params[:user_id])
        photo_attached = params[:story] && params[:story].has_key?(:photo)
        if photo_attached
            @story.photo.attach(params[:story][:photo])
        end 

        if @story.save 
            debugger 
            return render 'api/storys/show'
        end 
        private 

        def style_params 
            params.require(:story).permit(:user_id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color, :text_content)
        end 
    end 
end 