
import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const anecdoteActions = useAnecdoteActions()

  const vote = id => anecdoteActions.vote(id)

  const onCreate = event => {
    event.preventDefault()
    anecdoteActions.create(event.target.newAnecdote.value)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <div>
          <input name="newAnecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App