class PostTestSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :title
end
