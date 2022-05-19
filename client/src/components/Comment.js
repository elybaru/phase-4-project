import React, { useState, useEffect } from 'react'
import useLike from "../hooks/useLike"
import CommentForm from './CommentForm'
import useAuthor from '../hooks/useAuthor'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as regularHeart } from '@fortawesome/fontawesome-free-regular';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";


const Comment = ({ handleUpdateLike, handleDeleteLike, comment, user, setPost, post }) => {

    const [replyClicked, setReplyClicked] = useState(false)
    const [isAuthor, checkIfAuthor] = useAuthor()
    const [toggleEditCommentClicked, setToggleEditCommentClicked] = useState(false)
    const [editComment, setEditComment] = useState(null)

    // receive comment info, including likes, from props, from fullblogpost
    // check the current user if they can edit
    // map to child comments if they exist
    // comment route for submitting/editing a new comment?
    // POST
    // /posts/:post_id/comments/
    // PATCH DELETE
    // /posts/:post_id/comments/:id

    // 

    useEffect(() => {
        checkIfAuthor(post.user.id, user.id)
    }, [])

    // console.log("In comment component: ", { user, post })

    const handleReplyClick = (e) => {
        e.preventDefault()
        if (replyClicked === true) {
            setReplyClicked(false)
        }
        else {
            setReplyClicked(true)
        }
    }

    // const handleUpdateLike = (like) => {
    //     const updatedPost = { ...post, likes: [...post.likes, like] }
    //     setPost(updatedPost)
    // }

    // const handleDeleteLike = (likeId) => {
    //     const updatedPost = { ...post, likes: post.likes.filter(like => like.id != likeId) }
    //     setPost(updatedPost)

    // }

    const handleUpdateCommentLike = (like, id) => {
        const foundComment = comment.comments.find(c => c.id == id)
        const updatedComment = { ...foundComment, likes: [...foundComment.likes, like] }
        const updatedOwnerComment = { ...comment, comments: comment.comments.map(c => c.id == id ? updatedComment : c) }
        const updatedPost = { ...post, comments: post.comments.map(c => c.id == updatedOwnerComment.id ? updatedOwnerComment : c) }
        setPost(updatedPost)
    }

    const handleDeleteCommentLike = (likeId, id) => {
        const foundComment = post.comments.find(c => c.id == id)
        const updatedComment = { ...foundComment, likes: foundComment.likes.filter(l => l != likeId) }
        const updatedOwnerComment = { ...comment, comments: comment.comments.map(c => c.id == id ? updatedComment : c) }
        const updatedPost = { ...post, comments: post.comments.map(c => c.id == updatedOwnerComment.id ? updatedOwnerComment : c) }
        setPost(updatedPost)
    }

    const [isLiked, like] = useLike("comment", comment, user.id, handleUpdateLike, handleDeleteCommentLike)
    // console.log("I am the like in the comment component" + like)


    // console.log(replyClicked)

    // const handleCommentLikeClick = (e, id) => {
    //     e.preventDefault()
    //     fetch(`/likes`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ user_id: user.id, likeable_id: id, likeable_type: "comment" })
    //     })
    //         .then(r => r.json())
    //         .then(data => console.log(data))
    // }

    // const handleEditCommentClick = (e) => {
    //     console.log(comment)
    //     setEditComment(comment.content)
    //     setEditCommentClicked(true)
    // }

    const handleEditCommentClick = (e) => {
        e.preventDefault()
        if (toggleEditCommentClicked === true) {
            setToggleEditCommentClicked(false)
            console.log(toggleEditCommentClicked)
        }
        else {
            setToggleEditCommentClicked(true)
            console.log(comment)
            console.log(toggleEditCommentClicked)
            setEditComment(comment.content)
        }
    }

    const handleEditCommentChange = (e) => {
        setEditComment(e.target.value)
    }

    const handleDeleteCommentClick = (e) => {
        console.log(comment)
    }

    const handleEditCommentSubmit = (e) => {
        e.preventDefault()
        fetch(`/posts/${post.id}/comment/${comment.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: editComment })
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)

            })
    }

    const editCommentForm = () => {
        return (
            <form className="main-comment-form" onSubmit={handleEditCommentSubmit}>
                <input type="text" value={editComment} onChange={handleEditCommentChange} />
                <input type='submit' value="Update Comment" />
                <div>
                    <button className="muse-readmore" onClick={handleDeleteCommentClick}>Delete Comment</button>
                </div>
            </form >

        )
    }


    return (
        <div className="individual-comment-wrapper">
            <div>

                <div className="individual-comment-content">
                    {toggleEditCommentClicked ? editCommentForm() : comment.content}

                </div>
                <div>{comment.user.username}</div>
                <div className="individual-comment-likes-wrapper">
                    <p>{comment.likes ? comment.likes.length : null} likes</p>
                    <button className="individual-comment-like-button" onClick={like}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>
                </div>
                <button className="individual-comment-reply-button" onClick={handleReplyClick}>Reply</button>

                <div> {replyClicked ? <CommentForm comment={comment} setPost={setPost} post={post} setReplyClicked={setReplyClicked} /> : ""}
                </div>
                <div>
                    {isAuthor ? <button className="individual-comment-reply-button" onClick={handleEditCommentClick}>Edit</button> : null}
                </div>
                <div>
                    {comment.comments ? comment.comments.map(comment => { <Comment post={post} setPost={setPost} handleUpdateLike={handleUpdateCommentLike} handleDeleteLike={handleDeleteCommentLike} comment={comment} /> }) : null}
                </div>

            </div>


        </div>
    )
}

export default Comment
