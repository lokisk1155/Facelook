class Api::PostsController < ApplicationController
    def index
        @posts = Post.all
        render :index
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end
    
    def create
        @post = Post.new(post_params)
        if @post.save
            render :show
        else
            render json: { errors: @post.errors.full_messages }
        end
    end

    private 

    def post_params 
        params.require(:post).permit(:content, :user_id)
    end 

end 