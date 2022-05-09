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

  def comments_to_display
    self.object.comments.map do |comment| 
      {username: comment.user.username,
      content: comment.content,
      id: comment.id,
      likes: comment.likes
    }
    end
  end
end
