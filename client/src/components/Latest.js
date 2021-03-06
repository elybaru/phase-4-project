import React, { useState, useEffect } from 'react'
import BlogPost from './BlogPost'

const Latest = ({ setAuthors }) => {
    const [latestPosts, setLatestPosts] = useState(null)
    console.log(latestPosts)

    useEffect(() => {
        // A useEffect to grab the 10 latest Posts, must be a custom method from a serializer
        fetch("posts/latest").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setLatestPosts(data)
                });
            }
        });
    }, []);

    return (
        <div className="content-wrapper">
            <h1 className="title">Latest posts</h1>
            <div>
                {latestPosts ? latestPosts.map(latestPost => {
                    return <BlogPost key={latestPost.id} latestPost={latestPost} />
                }) : ""}
            </div>

        </div>
    )
}

export default Latest
