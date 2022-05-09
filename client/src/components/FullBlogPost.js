import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment';
import useAuthor from '../hooks/useAuthor.js';

const FullBlogPost = ({ user }) => {
    const [newComment, setNewComment] = useState("")
    const [isAuthor, checkIfAuthor] = useAuthor()
    const [likeOnBlog, setLikeOnBlog] = useState(false)
    const [post, setPost] = useState(null)
    let { id } = useParams()


    useEffect(() => {
        if (post == null) {
            fetch(`/posts/${id}/`).then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setPost(data);

                    });
                }
            });
        }
        else {
            checkIfAuthor(post.user.id, user.id);
        }

    }, [post]);

    console.log("Am I the author of this post?" + isAuthor)
    // why doesn't this change to trye?

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/posts/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newComment })
        })
            .then(r => r.json())
            .then(data => {
                setPost({ ...post, comments_to_display: data.post.comments_to_display })
                setNewComment("")
            })
    }



    console.log(post)

    // Need to separate the comments into a different component, map them from this component 

    const handleMainLikeClick = (e) => {
        e.preventDefault()
        fetch(`/posts/${id}/likes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user.id, likeable_type: "post" })
        })
            .then(r => r.json())
            .then(data => {
                setPost(...post, { likes: data })
                setLikeOnBlog(true)
            })
        console.log("You've just hit the main like button")
    }

    // this isn't working
    const handleCommentLikeClick = (e) => {
        e.preventDefault()
        fetch(`/likes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user.id, likeable_type: "comment" })
        })
            .then(r => r.json())
            .then(data => console.log(data))
    }

    console.log(likeOnBlog)


    return (
        <div>
            {post ?
                <div className="content-wrapper">
                    <div className="content">
                        <h2 className="title">{post.title}</h2>
                        <p> by {post.user.username} </p>
                    </div>
                    <div className="muse-text-content">
                        {post.content}
                    </div>
                    <div>
                        <button className="main-likes-button" onClick={handleMainLikeClick}>Like</button>
                    </div>
                    <div>
                        {post.likes.length} likes, {post.comments_to_display.length} comments.
                    </div>
                    <div>
                    </div>
                    <div className="main-comment-wrapper">
                        <form className="main-comment-form" onSubmit={handleSubmit}>
                            <h3 className="comments-title"> Comments </h3>
                            <input type="text" placeholder="Write a new comment..." value={newComment} onChange={handleChange} />
                            <div>
                                <button className="main-likes-button" onClick={e => handleCommentLikeClick(e)}>Like comment</button>
                            </div>
                            <input type='submit' />
                        </form >
                    </div>
                    <div className="all-comments-wrapper">{post.comments_to_display ? post.comments_to_display.map(comment => {

                        return <Comment comment={comment} user={user} />
                    }) : ""}</div>
                </div>

                : ""
            }

        </div>
    )
}

export default FullBlogPost
