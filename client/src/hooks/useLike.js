import React, { useState, useEffect } from 'react'

const useLike = (likeableType, id) => {
    const [likes, setLikes] = useState(null)

    // handle Likes
    // likeablility---- posts or comments, they need to pass in type and id
    // how many likes does comment or post have?
    // are they from the current user?
    // has it been liked by the user

    useEffect(() => {
        // component will mount before id, and check if undefined or null then dont do anything
        if (id) {
            fetch(`/${likeableType}s/${id}/likes`)
                .then(r => r.json())
                .then(data => setLikes(data))
        }
    }, [id])

    const handleLikeClick = (e) => {
        e.preventDefault()
        fetch(`/likes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ likeable_id: id, likeable_type: likeableType })
        })
            .then(r => r.json())
            .then(data => console.log(data))
    }

    const handleUnlikeClick = (e, id) => {
        e.preventDefault()
        fetch(`/likes/${id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(data => console.log(data))
    }

    return [handleLikeClick, likes]
}

export default useLike
