import React, { useState } from 'react'

const useAuthor = () => {
    const [isAuthor, setIsAuthor] = useState(false)

    const checkIfAuthor = (id, userId) => {
        if (id === userId)
            setIsAuthor(true)
    }

    return [isAuthor, checkIfAuthor]
}

export default useAuthor
