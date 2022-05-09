class PostsController < ApplicationController

# GET /posts
  def index
    if params[:user_id]
        @posts = User.find(params[:user_id]).posts

    else
        @posts = Post.all
    end
        render json: @posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end


def create
    post = current_user.posts.create!(post_params)
    render json: post, status: :created
end

def update
    post = Post.find(params[:id])
    post.update!(post_params)
    render json: post, status: :created
end

  private

  def post_params
    params.permit(:title, :content)
  end


end
