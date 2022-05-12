class LikesController < ApplicationController

    # p= Post.last
    # p.likes.create(user_id: User.last.id, likeable_type: "post")

    # post_likes

    def index
        if params[:post_id]
            post = Post.find(params[:post_id])
            likes = post.likes
        elsif params[:comment_id]
            comment = Comment.find(params[:comment_id])
            likes = comment.likes
        else
            likes = Like.all
        end
        render json: likes, status: :created
    end

    def show
        like = Like.find(params[:id])
        render json: like, status: :created
    end

    def likes_on_post
        post = Post.find(params[:id])
        likes = post.likes
        render json: likes, status: :created
    end


    def create
        if params[:likeable_type] == "post"
            post = Post.find(params[:likeable_id])
            like = post.likes.create!({user_id: current_user.id, likeable_type: params[:likeable_type]})
        else 
            comment = Comment.find(params[:likeable_id])
            like = comment.likes.create!({user_id: current_user.id, likeable_type: params[:likeable_type]})
        end
        render json: like, status: :created
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
    end

    # this action needs a unique name in this controller, and if so a special custom route in routes.rb
    # def create
    #     post = Post.find(params[:post_id])
    #     like = post.likes.create!({user_id: current_user.id, likeable_type: "comment"})
    #     render json: like, status: :created
    # end

    ## will need different actions for comment likes

    ## where are strong params

    

    private

    # how about for likes for comments, different params (likeable_type) 

    # def like_params
    #     params.permit(:user_id, :likeable_type)
    # end




end
