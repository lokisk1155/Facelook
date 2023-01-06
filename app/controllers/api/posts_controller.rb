class Api::PostsController < ApplicationController
    def index 
        if params[:limit]
            @posts = []
            limit = params[:limit].to_i
            @posts = Post.take(limit)
            render'api/posts/index'
        else 
            @posts = Post.all
            render 'api/posts/index'
        end 
    end

    def show 
        @posts = Post.where(user_id: params[:id])
        render 'api/posts/index'
    end 
    
    def create
        @post = Post.new(post_params)
        if @post.save
            @posts = Post.all
            render'api/posts/index'
        else
            render json: { errors: @post.errors.full_messages }
        end
    end

    def update
        @post = Post.find(params[:id])
        photo_attached = params[:post_attached] && params[:post_attached].has_key?(:photo)
        if photo_attached
          @post.photo.attach(params[:post_attached][:photo])
        end
        if photo_attached || @post.update(update_params)
          render 'api/posts/show'
        else
          render json: { errors: @post.errors.full_messages }
        end
      end

    def destroy 
        @post = Post.find(params[:id])
        if @post
            @post.destroy
            render json: { }
        end
    end

    private 

    def post_params 
        params.require(:post).permit(:content, :user_id)
    end 

    def update_params 
        params.require(:post).permit(:content, :user_id, :id)
    end 

end 