# Blog site

# Fuctionality

like something one time per user, either comment of post
nested comments

TODAY
- Nested comments (once?)
- Like model question (polymorphic)

User
Sign up
login
logout
If you delete a user, delete all posts

Post - full CRUD

Visible only to other users or everyone
make comment and posts only to logged in users (only index and show for posts and comments if not logged in)

Comment - full CRUD

Like and unlike comments and posts

# Models

## User
---
has many posts
has many comments
has many commented_posts through comments model Post

has_many: it's associations singular's class and find the foreign key that points back to this class based on its name_id, then SELECT * from POSTS WHERE user_id = self.id (whatever the ID is of user)


username
password_digest
first name
last name

## Post
---
belong to a user
has_many comments
has many commented_users through comments model User
has many :likes, as: :likeable
has many users through likes

title
content
user_id:integer


POST /posts
def create
@post = current_user.posts.new

def index
@posts = current_user.posts
end

To only see posts from the current user:
private
def set_post
@post = current_user.posts.find(params[:id])
end

foreign key means at the db level you enforce referencial integrity- you cant have a row in the post table that doesn't have an Id that points to a valid user

## Comment
--- 
belongs_to user
belongs_to blog

(To create a new comment? 
@comment = current_user.comments.new(comment_params).merge(post_id: params[:post_id])

post.comments.create(comment_params).merge(current_user) 


private
def comment_params
params.require(:comment).permit(:content)
end
)

### Thread




content
user_id:integer
blog_id:integer


## Like
---------
belongs_to :user
belongs_to :likeable, polymorphic:true

user_id
likeable_id
t.string "likeable_type => "post", "comment"
(ability to track multuple objects that might have the same id)







## Comment

Foreign key in comment model

rails g model Comment content:text post:references user:
references

Using t.bigint :supplier_id makes the foreign key naming obvious and explicit. In current versions of Rails, you can abstract away this implementation detail by using t.references :supplier instead.

rails g controller Comments

(post- has_many comments)

send a post request to a specific route
nest route underneath post

in routes
resources :posts do 
resouces :comments, only: [:create]
end

which gives you /posts/post_id/comments (will receive a post request to this route and then will create a comment related to a specific post)

need to pass in an argument to this method, the post id

comments controller
def create
create a new comment
for the post from current_user
@comment = current_user.comment.new(comment_params)

redirect_to post_path(params[:post_id])

end

private
def comment_params
params.require(:comment).permit(:content, :parent_id).merge(post_id: params[:post_id])
end


## N+1 and memoization
N+1 query (fetch a list of blog post and fire off another query for each comment)

@post.comments.includes(:user)
to pre-load user object

def current_user
if @current_user
return @current_user

if session[:user_id]
@current_user = User.find(session[:user_id])
end
end
end



def current_iser
if session[:user_id]
@current_user ||= User.find(session[:user_id])
end

or equals= memoization

## Nested comments

store id of parent comment in a column called parent id

parent_id, null: (when comment at top level wont have parent id) true
integer

Comment model

(no class called pared)
belongs_to :parent, class_name: 'Comment', optional: true
has_many :comments, foreign_key: :parent_id

(front end, need to pass down parent id)


comments controller
def create
create a new comment
for the post from current_user
@comment = current_user.comment.new(comment_params)

redirect_to post_path(params[:post_id])

end

private
def comment_params
params.require(:comment).permit(:content, :parent_id).merge(post_id: params[:post_id])
end




## This weekend
user login and and logout
and signup
routes
basic frontend 



### One on one
- Git issue
- Is the polymorphic/ self joins correct?
- What's in the navbar?
- What's the name of the blog
- Route for own blogs


## Navbar
If logged out:
- Login
- Signup

If Loggedin
- Home
- My Entries
    - Individual entry
- Create
- Explore
    Users
        Posts
- Logout


## Monday eve
- Login issues
- Routes, conditionally render or behind auth?


## Tuesday

For the likes, currently:

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "likeable_id"
    t.string "likeable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_likes_on_user_id"
  end 

  I think this is necessary so a post or comment can be liked only once per user:

  t.index ["user_id", "post_id], name: "index_likes_on_user_id", unique: true

  and also:

  t.integer "likeable_id", null: false

  And I updated the like.rb model with a validation:

  class Like < ApplicationRecord
  validates :user_id, uniqueness: { scope:[:likeable_id, :likeable_type]}
  belongs_to :user
  belongs_to :likeable, polymorphic:true


## Weds

XX List authors, navlink to nested post route
/user/:id/posts/:id 

XX Create post

- Display username with list of their blogs

- Do not display user's own user page link- use navbar menu for that (need to link that to the user)

- Display short_content for blog post 

## Weds eve
- added :likes to post serializer, correct?

## Thurs
- need to add dependent destroy in user model, like so:

# app/models/user.rb
  class User < ActiveRecord::Base
    has_many :posts, dependent: :destroy
  end


  ### Fri
  - comments
   ---- edit comments if author
   - posts edit if author (also delete)
   - delete user
   -likes