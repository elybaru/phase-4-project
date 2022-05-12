import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Authors = () => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {

        fetch("/users").then((r) => {
            if (r.ok) {
                r.json().then((data) => setAuthors(data));
            }
        });
    }, []);
    console.log(authors)
    return (
        <div>
            <div>
                {authors ? authors.map(author => {
                    return <Link key={author.id} to={`/authors/${author.id}`}>{author.username}</Link>
                }) : "Loading..."}
            </div>

        </div>
    )
}

export default Authors
