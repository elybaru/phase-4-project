import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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


    return (
        <div>
            Hello

        </div>
    )
}

export default Author
