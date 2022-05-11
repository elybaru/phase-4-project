import React, { useState } from 'react'
import useLike from "../hooks/useLike"
import CommentForm from './CommentForm'

const Comment = ({ comment, user, setPost, post }) => {
    const [isLiked, like] = useLike("comment", comment, user.id)
    const [replyClicked, setReplyClicked] = useState(false)

    // receive comment info, including likes, from props, from fullblogpost
    // check the current user if they can edit
    // map to child comments if they exist
    // comment route for submitting/editing a new comment?
    // POST
    // /posts/:post_id/comments/
    // PATCH DELETE
    // /posts/:post_id/comments/:id

    // 

    const handleReplyClick = (e) => {
        e.preventDefault()
        if (replyClicked === true) {
            setReplyClicked(false)
        }
        else {
            setReplyClicked(true)
        }
    }
    console.log(replyClicked)

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


    return (
        <div className="individual-comment-wrapper">
            <div>
                <div className="individual-comment-content">
                    {comment.content}
                </div>
                <div>{comment.username}</div>
                <button className="individual-comment-reply-button" onClick={handleReplyClick}>Reply</button>
                <div> {replyClicked ? <CommentForm comment={comment} setPost={setPost} post={post} /> : ""}
                </div>
                <div>
                    {comment.comments_to_display ? comment.comments_to_display.map(comment => { <Comment comment={comment} /> }) : null}
                </div>
                <div className="individual-comment-likes-wrapper">
                    <button className="individual-comment-like-button" onClick={_ => like()}>{isLiked ? "Unlike" : "Like"}</button>
                    <p>{comment.likes.length} likes</p>
                </div>
            </div>


        </div>
    )
}

export default Comment
