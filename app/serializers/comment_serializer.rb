class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :user, :parent_id, :comments, :likes
  # has_one :post
  has_one :user
  # has_one :parent
  has_many :comments
  has_many :likes

  # def comments
  #   self.object.comments.map do |comment|
  #     {
  #       post: comment.post,
  #       user: comment.user,
  #       parent: comment.parent,
  #       likes: comment.likes,
  #       comments: comment.comments,
  #       id: comment.id,
  #       content: comment.content
  #     }
  #   end
  # end


  # def comments_to_display
  #   post_comments = self.object.comments.filter do |comment|
  #     !comment.parent_id
  #   end
  #   post_comments.map do |comment| 
  #     {username: comment.user.username,
  #     content: comment.content,
  #     id: comment.id,
  #     likes: comment.likes,
  #     comments: comment.comments
  #   }
  #   end
  # end


  # return in this serializer , can it look at user_id, username, post_id, parent_id
  # can it be recursive
  # The structure needs to be exactly the same all the way down.
end
