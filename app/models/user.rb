class User < ApplicationRecord
    has_many :posts
    has_many :comments
    has_many :posts_comments, through: :posts
end
