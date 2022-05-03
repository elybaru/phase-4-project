import React from 'react'
import { BASE_URL } from '../constants';

const Home = () => {

    const handleClick = (e) => {
        fetch('/posts')
            .then(r => r.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <button onClick={handleClick}>Fetch test</button>
        </div>
    )
}

export default Home
