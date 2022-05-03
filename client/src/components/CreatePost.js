import React, { useState } from 'react'

const CreatePost = () => {

    const [formData, setFormData] = useState(defaultFormData)

    const defaultFormData = {
        title: '',
        content: ''
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // stateful component for the create form
    // fetch request for POST of the form
    // how to interact with current user, must receive it in props?

    return (
        <div>
            <div><h2>Create a new post</h2></div>
            <form>
                <div>
                    <input type="text" name="Title" value={formData.title} onChange={handleFormChange} />
                </div>
                <div>
                    <input type="content" name="Body" value={formData.content} onChange={handleFormChange} />
                </div>
                <input type='submit' value='Submit' />
            </form>

        </div>
    )
}

export default CreatePost
