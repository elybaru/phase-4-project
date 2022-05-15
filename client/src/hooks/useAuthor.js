import React, { useState } from 'react'

const useAuthor = () => {
    const [isAuthor, setIsAuthor] = useState(false)
    // console.log("in useAuthor", isAuthor)

    const checkIfAuthor = (id, userId) => {
        if (parseInt(id) === parseInt(userId))
            setIsAuthor(true)
    }

    return [isAuthor, checkIfAuthor]
}

export default useAuthor
