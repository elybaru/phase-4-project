import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = ({ user }) => {
    const [post, setPost] = useState(null)
    // const [postUpdates, setPostUpdates] = useState(null)
    let { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`/posts/${id}`)
            .then(r => r.json())
            .then(data => setPost(data))

    }, [])

    const handleFormChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    console.log(post)

    const handleDeleteClick = (e) => {
        e.preventDefault()
        console.log(post.id)
        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
            .then((r) => {
                if (r.ok) {
                    navigate(`/authors/${user.id}`)
                }
            })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        fetch(`/posts/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: post.title, content: post.content })
        })
            .then(r => r.json())
            .then(data => {
                navigate(`/posts/${id}`)
            })
    }

    return (
        post ? <div className="content-wrapper">
            <div className="title"><h2>Edit Post</h2></div>
            <form onSubmit={handleUpdateSubmit}>
                <div>
                    <h3>Title</h3>
                    <input type="text" name="title" value={post.title} onChange={handleFormChange} />
                </div>
                <div>
                    <h4>Body</h4>
                    <textarea name="content" className="large-text-input" cols={40} rows={40} value={post.content} onChange={handleFormChange} />
                </div>
                <input type='submit' value='Submit' />
            </form>
            <div>
                <button className="muse-readmore" onClick={handleDeleteClick}>Delete Muse</button>
            </div>

        </div> : ""

    )
}

export default EditPost
