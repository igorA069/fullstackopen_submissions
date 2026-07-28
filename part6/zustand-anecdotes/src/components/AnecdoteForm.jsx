import { useAnecdoteActions } from '../store'

export const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()

  const onCreate = event => {
    event.preventDefault()
    create(event.target.newAnecdote.value)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <div>
          <input name="newAnecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}