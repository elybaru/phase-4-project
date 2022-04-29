class Like < ApplicationRecord
  belongs_to :user

  belongs_to :likeable, polymorphic:true

  # custom validation only lets a user create a like if likeable type is comment or post AND if user is unique

  private

  def only_one_like
    Like.find(user_id, likeable_type: post.class, likeable_id: post.id)
    # if statement if post if comment, else return fail validation
    # get user with params[:user_id]
    # after, check if it's post or comment using params likable type
    # after validate, get either post or comment
    # can check if user has many likes and can find one with same params

  end
end
