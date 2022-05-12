class CommentsController < ApplicationController

    # Create a comment in the rails console like so
    # u = Post.last
    # u.comments.create(user_id: User.last.id, content: "I am I u iz u.")

    def create
        post = Post.find(params[:post_id])
        comment = post.comments.create!({user_id: current_user.id, content: params[:content]})
        render json: comment, status: :created
    end

    def create_comment_reply
        post = Post.find(params[:post_id])
        comment = post.comments.find(params[:id])
        if comment
            comment.comments.create(comment_params)
        end
        render json: post, status: :created
    end

    ## New today thursday
    def update
        post = Post.find(params[:post_id])
        comment = post.comments.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        # post = Post.find(params[:post_id])
        # comment = post.comment.find(params[:id])
        # comment.destroy
        comment = Comment.find(params[:id]).destroy
        # restful convention dont return on delete
    end



      ## where are strong params

    private
      
    ## how to incorporate this?

    def comment_params
        params.require(:comment).permit(:content, :parent_id).merge(post_id: params[:post_id], user_id: current_user.id)
    end
end
