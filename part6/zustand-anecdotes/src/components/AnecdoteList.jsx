import { useAnecdotes, useAnecdoteActions } from '../store'

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => (b.votes - a.votes))
  const {vote} = useAnecdoteActions()
  return (
    sortedAnecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )))}