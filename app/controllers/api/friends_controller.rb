class Api::FriendsController < ApplicationController

    def create 
        @friend = Friend.new(friends_params)
        if @friend.save 
            @sender = User.find(friends_params[:sender_id])
            @receiver = User.find(friends_params[:receiver_id])
            @friendship = [@sender, @receiver]
            render :index
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
            render :show
        else 
            render json: {} 
        end 
    end 

    def index 
        @friend = Friend.find_by(sender_id: params[:user_id], receiver_id: current_user.id)

        unless @friend
            @friend = Friend.find_by(sender_id: current_user.id, receiver_id: params[:user_id])
        end

        if @friend
            render :show
        else
            render json: { errors: ["not friends."]}, status: 403
        end
    end 

    private 

    def friends_params 
        params.require(:friend).permit(:id, :sender_id, :receiver_id)
    end 


end 