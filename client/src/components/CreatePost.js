import React, { useState } from 'react'

const CreatePost = () => {

    const defaultFormData = {
        title: '',
        content: ''
    }

    const [formData, setFormData] = useState(defaultFormData)



    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => { setFormData(defaultFormData) })
    }

    // stateful component for the create form
    // fetch request for POST of the form
    // how to interact with current user, must receive it in props?

    return (
        <div>
            <div><h2>Create a new post</h2></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Title</h3>
                    <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
                </div>
                <div>
                    <h4>Body</h4>
                    <input type="textarea" name="content" className="large-text-input" cols={40} rows={40} value={formData.content} onChange={handleFormChange} />
                </div>
                <input type='submit' value='Submit' />
            </form>

        </div>
    )
}

export default CreatePost
