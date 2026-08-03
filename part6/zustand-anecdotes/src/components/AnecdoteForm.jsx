import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

export const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const { showNotification } = useNotificationActions()

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    create(content)
    showNotification(`You created '${content}'`)
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