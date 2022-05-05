import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import BlogPost from './BlogPost';

const Author = () => {
    let { id } = useParams()
    const [posts, setPosts] = useState()

    useEffect(() => {

        fetch(`/users/${id}/posts`).then((r) => {
            if (r.ok) {
                r.json().then((data) => setPosts(data));
            }
        });
    }, [id]);

    console.log(posts)
    

    const postsDisplay = posts? posts.map(post => {
        return <div>
            <h2>{post.title}</h2>
            <div>{post.short_content}</div>
            <Link to={`/posts/${post.id}`}> Read more </Link>
        </div>
    }) : null



    return (
        <div>

            {posts ? <h2>{posts[0].user.username}</h2> : null}

            <div>{posts ? postsDisplay : ""}</div>

        </div>
    )
}

export default Author
