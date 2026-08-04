import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const { vote, remove } = useAnecdoteActions()
  const { showNotification } = useNotificationActions()

  const onVote = (anecdote) => {
    vote(anecdote.id)
    showNotification(`You voted '${anecdote.content}'`)
  }

  const onRemove = (anecdote) => {
    remove(anecdote.id)
    showNotification(`You removed '${anecdote.content}'`)
  }

  return (
    anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote)}>vote</button>
          {anecdote.votes === 0 && <button onClick={() => onRemove(anecdote)}>delete</button>}
        </div>
      </div>
    )))}