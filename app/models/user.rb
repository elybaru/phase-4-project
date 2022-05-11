class User < ApplicationRecord
    has_secure_password #macro methods- create methods for us (such as attr_accessory) Given by bcrypt, create authnticate method, a password method (like a setter and getter/reader and writer), and then sets the password as password_digest and encrypts as well

    has_many :posts, dependent: :destroy
    has_many :comments
    # has_many :posts_comments, through: :posts

    validates :username, presence: true, uniqueness: true
end
