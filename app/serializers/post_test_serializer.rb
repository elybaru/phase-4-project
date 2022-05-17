class PostTestSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :title, :short_content

  def short_content
    "#{self.object.content[0..50]}..."
  end
end
