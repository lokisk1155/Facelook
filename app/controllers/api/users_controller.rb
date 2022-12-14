class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password', 'id', 'profilePic']

    def index 
      if params.has_key?(:user_ids) 
        @users = [] 
        idArray = params[:user_ids].split(",")
        idArray.each do |id| 
          user = User.find(id)
            @users << user if user 
        end 
          render 'api/users/friends'
      else 
        @users = User.all 
        render 'api/users/index'
      end 
    end 

    def create
      @user = User.new(create_params)
      if @user.save
        login!(@user)
        render 'api/users/show'
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    def show 
      @user = User.find(params[:id])
      render 'api/users/show'
    end 

    def update
      @user = User.find(params[:id])
      result = false
      
      if params.has_key?(:profile_pic)
        @user.profile_pic.attach(params[:profile_pic])
        result = @user.save
      else 
        result = @user.update(update_params)
      end
  
      if result
        render 'api/users/show'
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :gender, :day, :month, :year)
    end

    def update_params
      params.require(:user).permit(:email, :id, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured, :work, :location, :education, :relationship, :phone_number, :created_at, :profile_pic, :highschool, :social_link, :language, :website, :places_lived, :places_worked)
    end
end 

