import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


const CommentForm = ({ comment, setPost, post }) => {
    let { id } = useParams()
    const [newComment, setNewComment] = useState("")

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/posts/${id}/comments/${comment.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parent_id: comment.id, content: newComment })
        })
            .then(r => r.json())
            .then(data => {
                setPost({ ...post, comments_to_display: data.post.comments_to_display })
                setNewComment("")
            })
    }

    return (
        <div>
            <form className="main-comment-form" onSubmit={handleSubmit}>
                <h3> </h3>
                <input type="text" placeholder="Write a new comment..." value={newComment} onChange={handleChange} />
                <input type='submit' />
            </form >

        </div>
    )
}

export default CommentForm
