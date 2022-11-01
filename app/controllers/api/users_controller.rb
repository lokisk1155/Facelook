class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password', 'id']

    def index 
      @users = User.all 
      render :index
    end 

    def create
      @user = User.new(create_params)
      p @user 
      p '------- this create --------'
      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    def show 
      @user = User.find(params[:id])
      p @user 
      p '------- this --------'
      render :show 
    end 

    def update
      @user = User.find(params[:id])
      update = @user.update!(user_params)
      if update
        render :show
      else
        render json: { errors: @user.errors.full_messages }
      end
    end

    private

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :gender, :day, :month, :year)
    end

    def user_params
      params.require(:user).permit(:email, :id, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured, :work, :location, :education, :relationship, :phone_number, :created_at)
    end
end 

