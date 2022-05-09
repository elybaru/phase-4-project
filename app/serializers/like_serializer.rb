class LikeSerializer < ActiveModel::Serializer
  attributes :id, :likeable_id, :likeable_type, :user_id
end
