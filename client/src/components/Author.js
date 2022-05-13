import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import useAuthor from '../hooks/useAuthor.js';

const Author = ({ user }) => {
    let { id } = useParams()
    const [posts, setPosts] = useState()
    const [isAuthor, checkIfAuthor] = useAuthor()

    useEffect(() => {

        fetch(`/users/${id}/posts`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setPosts(data)
                    checkIfAuthor(id, user.id)
                });
            }
        });
    }, [id]);

    console.log(posts)
    console.log(user)
    console.log("Am I the author of these posts? " + isAuthor)

    const postsDisplay = posts ? posts.map(post => {
        return <div>
            <h2>{post.title}</h2>
            <div>{post.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${post.id}`}> Read more </Link></button>
        </div>
    }) : null



    return (
        <div className="content-wrapper">

            {posts ? <h1>{posts[0].user.username}</h1> : null}

            <div>{posts ? postsDisplay : ""}</div>

        </div>
    )
}

export default Author