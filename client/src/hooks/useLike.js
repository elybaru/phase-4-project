import React, { useState, useEffect } from 'react'

const useLike = (likeableType, likeable, userId, handleUpdateLike, handleDeleteLike) => {
    const [liked, setLiked] = useState(undefined)
    const [likeId, setLikeId] = useState(null)

    useEffect(() => {
        // component will mount before id, and check if undefined or null then dont do anything
        if (likeable && likeable.likes) {
            likeable.likes.forEach(like => (like.user_id === userId) ? setLikedandLikeId(like) : null)
            // need to set likeId to the id of the like  setLikeId(like.id)
        }
    }, [likeable])

    const setLikedandLikeId = (like) => {
        setLiked(true)
        setLikeId(like.id)
    }

    const like = () => {
        if (!liked) {
            fetch(`/likes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ likeable_id: likeable.id, likeable_type: likeableType })
            }).then(resp => resp.json())
                .then(data => {
                    setLikeId(data.id)
                    handleUpdateLike(data, likeable.id)
                })
                .then(_ => setLiked(true))
        } else {
            fetch(`/likes/${likeId}`, {
                method: 'DELETE'
            })
                .then(_ => {
                    setLiked(false)
                    handleDeleteLike(likeId, likeable.id)
                })
            // fetch request to an endpoint to delete a reference to a like
            // and then setLiked(false) afterwards
        }
    }

    return [liked, like]
    // const [currentUserPostLike, setCurrentUserPostLike] = useState(false)

    // // handle Likes
    // // likeablility---- posts or comments, they need to pass in type and id
    // // how many likes does comment or post have?
    // // are they from the current user?
    // // has it been liked by the user



    // const handleLikeClick = (e) => {
    //     e.preventDefault()
    //     fetch(`/likes`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ likeable_id: id, likeable_type: likeableType })
    //     })
    //         .then(r => r.json())
    //         .then(data => console.log(data))
    // }

    // const handleUnlikeClick = (e, id) => {
    //     e.preventDefault()
    //     return fetch(`/likes/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(r => r.json())
    // }

    // const currentUserLikeOnPost = (postOrComment, userId) => {

    //     // const liked = postOrComment.likes.filter(like => like.user_id === user.id)
    //     setCurrentUserPostLike(!!)
    // }

    // return [handleLikeClick, likes, currentUserPostLike, currentUserLikeOnPost, handleUnlikeClick, setCurrentUserPostLike]
}

export default useLike
