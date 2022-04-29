class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :post
  has_one :user
  has_one :parent
end
