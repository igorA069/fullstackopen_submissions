import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }
  const { anecdotes, isPending, isError } = useAnecdotes()

  if (isPending) {
    return <>Waiting for server</>
  }
  if (isError) {
    return <>anecdote service not available due to problems in server</>
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default App