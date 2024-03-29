# frozen_string_literal: true

module Api
  class PostsController < ApplicationController
    def index
      if params[:limit]
        @posts = []
        limit = params[:limit].to_i
        @posts = Post.take(limit)
      else
        @posts = Post.all
      end
      render 'api/posts/index'
    end

    def show
      @posts = Post.where(user_id: params[:id])
      render 'api/posts/index'
    end

    def create
      @post = Post.new(post_params)
      if @post.save
        @posts = Post.all
        render 'api/posts/show'
      else
        render json: { errors: @post.errors.full_messages }
      end
    end

    def update
      @post = Post.find(params[:id])
      map_attached = params[:map]
      if map_attached
        @post.photo.attach(params[:map])
        render 'api/posts/show'
      else
        photo_attached = params[:post_attached]&.key?(:photo)
        @post.photo.attach(params[:post_attached][:photo]) if photo_attached
        render 'api/posts/show' if photo_attached || @post.update(update_params)
      end
    end

    def destroy
      @post = Post.find(params[:id])
      return unless @post

      @post.destroy
      render json: {}
    end

    private

    def post_params
      params.require(:post).permit(:content, :user_id)
    end

    def update_params
      params.require(:post).permit(:content, :user_id, :id)
    end
  end
end
