import React, {useState} from 'react'

const Comment = ({comment}) => {

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
        // when clicked, reveals a form
    }
    return (
        <div>
            <div>
                            <div>
                                {comment.content}
                            </div>
                            <div>{comment.username}</div>
                            <button onClick={handleReplyClick}>Reply</button>
                        </div>
            

        </div>
    )
}

export default Comment
