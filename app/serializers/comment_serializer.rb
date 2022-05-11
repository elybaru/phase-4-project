class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :post
  has_one :user
  has_one :parent_id, serializer: CommentSerializer
  has_many :likeable


  # return in this serializer , can it look at user_id, username, post_id, parent_id
  # can it be recursive
  # The structure needs to be exactly the same all the way down.
end
