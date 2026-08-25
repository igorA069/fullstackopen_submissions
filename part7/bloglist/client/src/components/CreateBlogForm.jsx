import { useState } from 'react'
import { TextField, Button } from '@mui/material'

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
          <TextField 
            value={title} 
            onChange={ (event) => setTitle(event.target.value) } 
            label='title' 
            size='small' 
            margin='dense' />
        </div>
        <div>
          <TextField 
            value={author} 
            onChange={ (event) => setAuthor(event.target.value) } 
            label='author' 
            size='small' 
            margin='dense' />
        </div>
        <div>
          <TextField 
            value={url} 
            onChange={ (event) => setUrl(event.target.value) } 
            label='url' 
            size='small' 
            margin='dense' />
        </div>
        <div>
          <Button type='submit' variant='contained' sx={{ mt: 1 }}>
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogForm