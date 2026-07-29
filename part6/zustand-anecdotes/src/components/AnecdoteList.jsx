import { useAnecdotes, useAnecdoteActions, useFilter } from '../store'

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  const filteredAnecdotes = filter ? anecdotes.filter(anecdote => anecdote.content.includes(filter)) : anecdotes
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => (b.votes - a.votes))

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