import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const FullBlogPost = () => {
    const [post, setPost] = useState(null)

    let { id } = useParams()
    const [posts, setPosts] = useState()

    useEffect(() => {

        fetch(`/posts/${id}/`).then((r) => {
            if (r.ok) {
                r.json().then((data) => setPosts(data));
            }
        });
    }, []);
    
    console.log(post)

    return (
        <div>
            I am a full blog post
            {post ? 
            <div>
                
                <h2>{post.title}</h2>
                <div>
                    {post.content}
                </div>
                <div>
                    <form className="main-comment-form">
                    <input type='submit' onSubmit={handleSubmit} />
                    </form>    
                </div>
                <div>{post.comments ? post.comments.map : ""}</div>
            </div>

                : ""
            }
            
        </div>
    )
}

export default FullBlogPost
