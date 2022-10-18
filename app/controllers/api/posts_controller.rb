class Api::PostsController < ApplicationController
    def index # (passed in from frontend, type and author_id)
        # if type = home page
        # then @posts = Post.all
        # else if type = prof page
        # @posts = Post.find(by an author_id) (1 way)
        # @posts = Post.user_posts
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

    private 

    def post_params 
        params.require(:post).permit(:content, :user_id)
    end 

end 