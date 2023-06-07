# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + %w[password id profilePic]

    def index
      if params.key?(:user_ids)
        @users = []
        idArray = params[:user_ids].split(',')
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
      @user = User.find(current_user.id)
      photoAttached = false



      if params[:user]

      if params[:user].key?(:profile_pic)
        @user.profile_pic.attach(params[:user][:profile_pic])
        photoAttached = true
      end

      if params[:user].key?(:cover_photo)
        @user.cover_photo.attach(params[:user][:cover_photo])
        photoAttached = true
      end

      end 

      result = false

      result = if photoAttached
                 @user.save
               else
                 @user.update(update_params)
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
      params.require(:user).permit(:email, :id, :first_name, :last_name, :gender, :day, :month, :year, :bio, :featured,
                                   :work, :location, :education, :relationship, :phone_number, :created_at, :highschool, :social_link, :language, :website, :places_lived, :places_worked)
    end
  end
end
