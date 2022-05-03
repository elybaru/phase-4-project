import React, { useState, useEffect } from 'react'

const Authors = () => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {

        fetch("/users").then((r) => {
            if (r.ok) {
                r.json().then((data) => setAuthors(data));
            }
        });
    }, []);
    return (
        <div>
            <div>
                {authors ? authors.map(author => {
                    <Link to={`/users/${author.id}`}>{author.username}</Link>
                    // Need to include posts for route /users/id
                }) : "Loading..."}
            </div>

        </div>
    )
}

export default Authors
