import { useNavigate } from 'react-router-dom'

import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const navigate = useNavigate()

  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    navigate('/')
  }

  const onReset = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  const pickProperties = ({ type, value, onChange, ...rest }) => ({ type, value, onChange })

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...pickProperties(contentField)} />
        </div>
        <div>
          author
          <input {...pickProperties(authorField)} />
        </div>
        <div>
          url for more info
          <input {...pickProperties(infoField)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={onReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
