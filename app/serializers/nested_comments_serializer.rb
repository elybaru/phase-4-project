class NestedCommentsSerializer < ActiveModel::Serializer
  attributes :id, :content, :post, :user, :parent, :comments, :likes
  has_one :post
  has_one :user
  has_one :parent
  has_many :comments
  has_many :likeable
end
