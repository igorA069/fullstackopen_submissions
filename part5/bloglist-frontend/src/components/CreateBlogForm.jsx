import { useState } from 'react'

const CreateBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const internalOnSubmit = async (event) => {
    event.preventDefault()

    await onSubmit(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ internalOnSubmit }>
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
  )
}

export default CreateBlogForm