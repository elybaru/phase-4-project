import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Comment from './Comment';
import useAuthor from '../hooks/useAuthor.js';
import useLike from '../hooks/useLike';

const FullBlogPost = ({ user }) => {
    let { id } = useParams()
    const [newComment, setNewComment] = useState("")
    const [isAuthor, checkIfAuthor] = useAuthor()
    const [post, setPost] = useState(null)
    const [isLiked, like] = useLike("post", post, user.id)
    // const [handleLikeClick, likes, currentUserPostLike, currentUserLikeOnPost, handleUnlikeClick, setCurrentUserPostLike] = useLike("post", id)
    const [likeOnBlog, setLikeOnBlog] = useState(false)




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
            // currentUserLikeOnPost(post, user);
        }

    }, [post]);

    console.log("Am I the author of this post?" + isAuthor)

    // const displayUnlikePost = () => {
    //     return (
    //         <button className="main-likes-button" onClick={(e) => {
    //             handleUnlikeClick(e, post.id).then(() => {
    //                 setCurrentUserPostLike(false)
    //                 setPost(post => {
    //                     return { ...post, likes: post.likes.filter(like => like.user_id !== user.id) }
    //                 })

    //             })
    //         }} size="small">Unlike</button>

    //     )
    // }

    // const displayLikePost = () => {
    //     return (
    //         <button className="main-likes-button" onClick={(e) => {
    //             handleLikeClick(e).then(() => setCurrentUserPostLike(true))
    //         }} size="small">Like</button>
    //     )
    // }
    // why doesn't this change to trye?

    // to check if user has liked, new Set [], use .has

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
                // console.log("I AM THE RETURNED DATA FROM COMMENT" + data)
                setPost({ ...post, comments: [...post.comments, data] })
                setNewComment("")
            })
    }



    console.log(post)

    const handleEditPost = (e) => {
        console.log({
            title: post.title,
            content: post.content
        })
    }

    const renderEditPost = () => {
        return <button onClick={handleEditPost}>Edit</button>
    }

    const handleDeleteClick = (e, id) => {
        e.preventDefault()
        console.log(id)
    }

    // Need to separate the comments into a different component, map them from this component 

    return (
        <div>
            {post ?
                <div className="content-wrapper">

                    <div className="muse-wrapper">
                        <div className="content">
                            <h2 className="muse-title">{post.title}</h2>
                            <p className="byline"> by {post.user.username} </p>
                        </div>
                        <div className="muse-text-content">
                            {post.content}
                        </div>
                        <div>
                            <button className="individual-comment-like-button" onClick={_ => like()}>{isLiked ? "Unlike" : "Like"}</button>
                            {/* {isLiked ? "UNLIKE" : "LIKE"} */}
                        </div>

                        <div>
                            {post.likes.length} likes, {post.comments_to_display.length} comments.
                    </div>

                        {/* <div>
                        {isAuthor ? <button className="muse-readmore"><Link to={`/posts/${id}/edit`}>Edit</Link></button> : ""}
                    </div> */}
                        {/* <div>
                        {isAuthor ? <button className="muse-readmore" onClick={handleDeleteClick}>Delete Muse</button> : ""}
                    </div> */}
                    </div>
                    <div className="double-border-nav">
                    </div>
                    <div className="main-comment-wrapper">
                        <form className="main-comment-form" onSubmit={handleSubmit}>
                            <h3 className="comments-title"> Comments </h3>
                            <input type="text" placeholder="Write a new comment..." value={newComment} onChange={handleChange} />
                            <input type='submit' />
                        </form >
                    </div>
                    <div className="all-comments-wrapper">{post.comments ? post.comments.map(comment => {

                        return <Comment comment={comment} user={user} setPost={setPost} post={post} />
                    }) : ""}</div>
                </div>

                : ""
            }

        </div>
    )
}

export default FullBlogPost
