class Api::FriendsController < ApplicationController

    def create 
        @friend = Friend.new(friends_params)
        if @friend.save 
            @sender = User.find(friends_params[:sender_id])
            @receiver = User.find(friends_params[:receiver_id])
            @friendship = [@sender, @receiver]
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
            render :show
        else 
            render json: {} 
        end 
    end 

    def index 
        @sessionUserFriendIds = [] 
        @userFriends = []

        @friends = Friend.all
        @users = User.all 

        @friends.each do |friend| 
            if friend.sender_id == params[:user_id] 
                @sessionUserFriendIds << friend.receiver_id 
            elsif friend.receiver_id == params[:user_id]
                @sessionUserFriendIds << friend.sender_id
            end 
        end 

        @users.each do |user| 
            @sessionUserFriendIds.each do |id| 
                if user.id == id 
                    @userFriends << user 
                end 
            end 
        end 

        if @userFriends.length > 0 
            render :index 
        else 
            render json: { errors: 'No Friends!'}
        end 
    end 

    def show 
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