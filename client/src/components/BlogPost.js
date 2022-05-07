import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const BlogPost = ({ latestPost }) => {
    // receive from fetch or props the blog post, with the comments
    // map our comments to child component- or how should that be structured, conditional rendering if there are further child components in the object?
    // we need to fetch the number of likes, and determine if the current user has liked this post, and then conditionally render the like
    console.log(latestPost)

    return (
        <div className="muse">
            <h2 className="muse-title">{latestPost.title}</h2>
            <div className="muse-preview">{latestPost.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${latestPost.id}`}>Read more</Link></button>
            <div className="double-border">
            </div>

        </div>
    )
}

export default BlogPost
