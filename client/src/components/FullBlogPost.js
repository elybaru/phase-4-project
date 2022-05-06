import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment';

const FullBlogPost = ({ user }) => {
    const [newComment, setNewComment] = useState("")
    const [isAuthor, setIsAuthor] = useState(false)
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
            checkIfAuthor();
        }
        
    }, [post]);

    console.log("Am I the author of this post?" + isAuthor)
    // why doesn't this change to trye?

    const checkIfAuthor = () => {
        if (post.user.id === user.id)
            setIsAuthor(true)
    }

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


    return (
        <div>
            I am a full blog post
            {post ?
                <div>
                    <div>
                        <h2>{post.title}</h2>
                        <p> by {post.user.username} </p>
                    </div>
                    <div>
                        {post.content}
                    </div>
                    <div>

                    </div>
                    <div>
                        {post.likes.length} likes, {post.comments_to_display.length} comments.
                    </div>
                    <div>
                    </div>
                    <div>
                        <form className="main-comment-form" onSubmit={handleSubmit}>
                            <h3> Comments </h3>
                            <input type="text" placeholder="Write a new comment..." value={newComment} onChange={handleChange} />
                            <input type='submit' />
                        </form >
                    </div>
                    <div>{post.comments_to_display ? post.comments_to_display.map(comment => {

                        return <Comment comment={comment} />
                    }) : ""}</div>
                </div>

                : ""
            }

        </div>
    )
}

export default FullBlogPost
