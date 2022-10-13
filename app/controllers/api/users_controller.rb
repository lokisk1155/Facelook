class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)

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
    @user = User.new(user_params)
    if @user.id == current_user.id  
        @user.update
        render :show
      else
        render json: @user.errors.full_messages, status: 401
    end

end 

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured, :location, :education, :work, :relationship, :phone_number)
  end

end

