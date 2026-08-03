import { useAnecdotes, useAnecdoteActions, useFilter } from '../store'
import { useNotificationActions } from '../notificationStore'

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  const filteredAnecdotes = filter ? anecdotes.filter(anecdote => anecdote.content.includes(filter)) : anecdotes
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => (b.votes - a.votes))

  const { vote } = useAnecdoteActions()
  const { showNotification } = useNotificationActions()

  const onVote = (anecdote) => {
    vote(anecdote.id)
    showNotification(`You voted '${anecdote.content}'`)
  }

  return (
    sortedAnecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote)}>vote</button>
        </div>
      </div>
    )))}