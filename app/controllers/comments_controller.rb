class CommentsController < ApplicationController

    # Create a comment in the rails console like so
    # u = Post.last
    # u.comments.create(user_id: User.last.id, content: "I am I u iz u.")

    def create
        post = Post.find(params[:post_id])
        comment = post.comments.create!({user_id: current_user.id, content: params[:content]})
        render json: comment, status: :created
    end

      ## where are strong params

    private
      
    ## how to incorporate this?
    
    def comment_params
        params.require(:comment).permit(:content, :parent_id).merge(post_id: params[:post_id])
    end
end
