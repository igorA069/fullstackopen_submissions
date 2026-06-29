import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            await blogService.add(title, author, url, props.accessToken)
            props.setBlogs([...props.blogs, {title, author, url}])
            const isError = false
            props.showNotification(`a new blog "${title}" by ${author} added.`, isError)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            const isError = true
            props.showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
        }
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    title
                    <input value={title} onChange={ (event) => setTitle(event.target.value) }></input> 
                </label>
            </div>
            <div>
                <label>
                    author
                    <input value={author} onChange={ (event) => setAuthor(event.target.value) }></input> 
                </label>
            </div>
            <div>
                <label>
                    url
                    <input value={url} onChange={ (event) => setUrl(event.target.value) }></input> 
                </label>
            </div>
            <div>
                <button type='submit'>create</button>
            </div>
        </form>
    </div>
)}

export default CreateBlogForm