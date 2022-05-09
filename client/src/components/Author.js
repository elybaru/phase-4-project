import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import BlogPost from './BlogPost';

const Author = ({user}) => {
    let { id } = useParams()
    const [posts, setPosts] = useState()
    const [isAuthor, setIsAuthor] = useState(false)

    useEffect(() => {

        fetch(`/users/${id}/posts`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setPosts(data)
                    checkIfAuthor()
                });
            }
        });
    }, [id]);

    console.log(posts)
    // console.log(isAuthor)

    const checkIfAuthor = () => {
        // if (posts.user.id === user.id)
        //     setIsAuthor(true)
        console.log(isAuthor)
    }
    

    const postsDisplay = posts? posts.map(post => {
        return <div>
            <h2>{post.title}</h2>
            <div>{post.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${post.id}`}> Read more </Link></button>
        </div>
    }) : null



    return (
        <div className="content-wrapper">

            {posts ? <h2>{posts[0].user.username}</h2> : null}

            <div>{posts ? postsDisplay : ""}</div>

        </div>
    )
}

export default Author
