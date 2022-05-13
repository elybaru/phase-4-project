import React from 'react'


const Home = () => {

    const handleClick = (e) => {
        fetch('/posts')
            .then(r => r.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <h1>Welcome to Momentary Muse</h1>
            <p>A simple blog site.</p>
            <div className="padding-div">
            </div>
            <div className="muse-text-content">
                <p>This is a public-facing website, open to contributions from other poeple, so please be kind. </p>
            </div>
            <div className="padding-div">
            </div>
            <div className="muse-text-content">
                <p>I invite you to share your muse. Thank you for stopping by. </p>
            </div>
        </div>
    )
}

export default Home
