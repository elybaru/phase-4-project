import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constants'

const Latest = ({ setAuthors }) => {

    useEffect(() => {
        // A useEffect to grab the 10 latest Posts, must be a custom method from a serializer
        fetch("/users").then((r) => {
            if (r.ok) {
                r.json().then((data) => setAuthors(data));
            }
        });
    }, []);

    return (
        <div>
            <p>Latest posts</p>
        </div>
    )
}

export default Latest
