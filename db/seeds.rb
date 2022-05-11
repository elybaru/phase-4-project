User.create(username: "Test1", password_digest: "test1")
User.create(username: "Test2", password_digest: "test2")
User.create(username: "Test3", password_digest: "test3")


Post.create(title: "Test", content: "Anything", user_id: User.ids.sample)
Post.create(title: "Test2", content: "Something", user_id: User.ids.sample)
Post.create(title: "Test3", content: "Anything2", user_id: User.ids.sample)

Comment.create(post_id: Post.ids.sample, content: "Anything", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, parent_id: Comment.ids.sample, content: "Something", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, content: "Anything3", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, content: "Anything", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, parent_id: Comment.ids.sample, content: "Something", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, content: "Anything2", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, content: "Anything", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, parent_id: Comment.ids.sample, content: "Something", user_id: User.ids.sample)
Comment.create(post_id: Post.ids.sample, content: "Anything2", user_id: User.ids.sample)

