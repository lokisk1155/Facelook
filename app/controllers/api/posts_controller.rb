class Api::PostsController < ApplicationController

        # (passed in from frontend, type and author_id)
        # if type = home page
        # then @posts = Post.all
        # else if type = prof page
        # @posts = Post.find(by an author_id) (1 way)
        # @posts = Post.user_posts

    def index 
        @posts = Post.all
        render :index
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
            render :show 
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