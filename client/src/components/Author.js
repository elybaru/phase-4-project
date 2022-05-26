import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogPost from './BlogPost';
import useAuthor from '../hooks/useAuthor.js';

const Author = ({ user, handleLogoutClick, setUser }) => {
    let { id } = useParams()
    let navigate = useNavigate()
    const [currentAuthor, setCurrentAuthor] = useState()
    const [isAuthor, checkIfAuthor] = useAuthor()
    // const [isAuthor, setIsAuthor] = useState(false)
    // console.log("in Author", isAuthor)
    // console.log("In Author, current author is: ", currentAuthor)

    // const checkIfAuthor = (id, userId) => {
    //     if (parseInt(id) === parseInt(userId))
    //         setIsAuthor(true)
    // }

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

    const postsDisplay = isAuthor ? currentAuthor.posts.map(post => {
        return <div key={post.id}>
            <h2 className="muse-user-links"><Link to={`/posts/${post.id}`}>{post.title} </Link></h2>
            <div>{post.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
        </div>
    }) : currentAuthor && currentAuthor.posts.map(post => {
        return <div key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.short_content}</div>
            <button className="muse-readmore"><Link to={`/posts/${post.id}`}> Read more </Link></button>
        </div>
    })

    const noUserPosts = () => isAuthor ? <p>You haven't created any posts yet. Click the link above to create a new post.</p> : <p>{currentAuthor.username} hasn't created any posts yet.</p>

    const userPostHeading = () => isAuthor ? <h1>My musings</h1> : <h1>{currentAuthor.username}</h1>

    const handleDeleteAccountClick = (e) => {
        e.preventDefault()
        fetch(`/users/${id}`, {
            method: 'DELETE'
        }
        )
            .then(_ => {
                setUser(null)
                navigate('/signup')
            })
    }


    // const postsDisplay = currentAuthor ? currentAuthor.posts.map(post => {
    //     return <div key={post.id}>
    //         <h2>{post.title}</h2>
    //         <div>{post.short_content}</div>
    //         <button className="muse-readmore"><Link to={`/posts/${post.id}`}> Read more </Link></button>
    //     </div>
    // }) : null

    if (postsDisplay && postsDisplay.length == 0) {
        return (
            <div className="muse-readmore">
                <div className="no-posts-div">{noUserPosts()}</div>
                <div>
                    {isAuthor ? <div className="delete-account-div">
                        <p>If you wish to delete your account, click the button below.</p>
                        <button className="muse-readmore" onClick={handleDeleteAccountClick}>Delete Account</button>
                    </div> : null}
                </div>
            </div>

        )
    }
    return (
        <div className="content-wrapper">

            <div>{currentAuthor ? userPostHeading : null}</div>

            <div>{currentAuthor ? postsDisplay : null}</div>

            {isAuthor ? <div className="delete-account-div">
                <p>If you wish to delete your account, click the button below.</p>
                <button className="muse-readmore" onClick={handleDeleteAccountClick}>Delete Account</button>
            </div> : null}

        </div>
    )
}

export default Author
