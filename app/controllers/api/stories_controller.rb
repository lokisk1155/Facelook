class Api::StoriesController < ApplicationController
    def create 
        @story = Story.new(user_id: params[:user_id].to_i, name: 'this worked')
        if @story.save 
            render 'api/stories/show'
        end
    end 
end 