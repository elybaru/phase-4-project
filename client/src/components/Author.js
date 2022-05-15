import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import BlogPost from './BlogPost';
// import useAuthor from '../hooks/useAuthor.js';

const Author = ({ user }) => {
    let { id } = useParams()
    const [currentAuthor, setCurrentAuthor] = useState()
    // const [isAuthor, checkIfAuthor] = useAuthor()
    const [isAuthor, setIsAuthor] = useState(false)
    // console.log("in Author", isAuthor)
    // console.log("In Author, current author is: ", currentAuthor)

    const checkIfAuthor = (id, userId) => {
        if (parseInt(id) === parseInt(userId))
            setIsAuthor(true)
    }

    useEffect(() => {
        fetch(`/users/${id}`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setCurrentAuthor(data)
                    checkIfAuthor(id, user.id)
                });
            }
        });
        return () => {

        }
    }, [id]);


    // useEffect(() => {
    //     if (posts == null) {
    //         fetch(`/users/${id}/posts`).then((r) => {
    //             if (r.ok) {
    //                 r.json().then((data) => {
    //                     setPosts(data)
    //                 });
    //             }
    //         });
    //     }
    //     else {
    //         checkIfAuthor(id, user.id)
    //     }

    // }, [id]);

    console.log(currentAuthor)
    // console.log(user)
    // console.log(id)
    // console.log(user.id)
    // console.log(user)
    // console.log(isAuthor)
    console.log("In author: ", { id, userId: user.id, isAuthor })

    const postsDisplay = currentAuthor ? currentAuthor.posts.map(post => {
        return <div key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${post.id}`}> Read more </Link></button>
        </div>
    }) : null



    return (
        <div className="content-wrapper">

            {currentAuthor ? <h1>{currentAuthor.username}</h1> : null}

            <div>{currentAuthor ? postsDisplay : ""}</div>

        </div>
    )
}

export default Author
