import React, {useState} from 'react'

const CommentForm = ({parentId}) => {
    const [newComment, setNewComment] = useState("")

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
            body: JSON.stringify({ parent_id: parentId, content: newComment })
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
                            <h3> Comments </h3>
                            <input type="text" placeholder="Write a new comment..." value={newComment} onChange={handleChange} />
                            <input type='submit' />
                        </form >
            
        </div>
    )
}

export default CommentForm
