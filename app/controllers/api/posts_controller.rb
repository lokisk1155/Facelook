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
        update = @post.update(update_params)
        if update 
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