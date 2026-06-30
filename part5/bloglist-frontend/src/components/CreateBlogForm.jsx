import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [isVisible, setVisible] = useState(false)

    const toggleVisible = () => setVisible(!isVisible)

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
            toggleVisible()
        } catch (error) {
            const isError = true
            props.showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
        }
    }

    if (isVisible) {
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
            <button onClick={toggleVisible}>cancel</button>
        </div>
    )} else {
        return (
            <div>
                <button onClick={toggleVisible}>create new blog</button>
            </div>
        )
    }
}

export default CreateBlogForm