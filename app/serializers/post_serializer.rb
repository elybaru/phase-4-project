class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :latest_posts, :short_content, :comments, :comments_to_display, :likes
  has_one :user, except: [:password_digest]
  has_many :comments, serializer: CommentSerializer

  def latest_posts
    Post.last(10)
  end

  def short_content
    "#{self.object.content[0..50]}..."
  end

  # comment
  # id, parent_id, comments (Array of child comments, and all share the same structure)

  def comments_to_display
    post_comments = self.object.comments.filter do |comment|
      !comment.parent_id
    end
    post_comments.map do |comment| 
      {username: comment.user.username,
      content: comment.content,
      id: comment.id,
      likes: comment.likes,
      comments: comment.comments
    }
    end
  end
end
