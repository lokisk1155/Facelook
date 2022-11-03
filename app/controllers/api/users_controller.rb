class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password', 'id']

    def index 
      @users = User.all 
      # params.has_key?(:user_ids) # boolean checking for presence of user_ids key in params
      # /api/users?userIds=[1, 5, 7]
      # @users = User.find(params[:user_ids])
      render :index
    end 

    def create
      @user = User.new(create_params)
      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    def show 
      @user = User.find(params[:id])
      render :show 
    end 

    def update
      @user = User.find(params[:id])
      if params.has_key?(:profile_pic) then @user.profile_pic.attach(params[:profile_pic])
      update = @user.update!(update_params)
      
      if update
          render :show
        end 
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    private

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :gender, :day, :month, :year)
    end

    def update_params
      params.require(:user).permit(:email, :id, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured, :work, :location, :education, :relationship, :phone_number, :created_at, :profile_pic)
    end
end 

