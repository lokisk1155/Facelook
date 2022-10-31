class API::FriendsController < ApplicationController
    def create 
        @friend = Friend.new(friends_params)

        if @friend.save 
            render :show 
        else 
            render json: @friend.errors.full_messages
        end 
    end 

    def update 
        @friend = Friend.find(params[:id])

        if @friend.save 
            render :show 
        else 
            render json: @friend.errors.full_messages
        end 
    end 

    def destroy  
        @friend = Friend.find(params[:id])

        if @friend
            @friend.destroy 
            render json: {} 
        else 
            render json: {}, status 404 
        end 
    end 

    def index 
        @friends = Friend.all 
        render :index 
    end 

    private 

    def friends_params 
        params.require(:friend).permit(:id, :status, :sender_id, :receiver_id)
    end 


end 