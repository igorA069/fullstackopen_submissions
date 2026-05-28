import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setRandomSelection = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomAnecdoteIndex)
  }

  const getIndexWithMostVotes = () => {
    var mostVotes = 0
    var indexWithMostVotes = 0
    for (var i=0; i < anecdotes.length; i++)
    {
      if (votes[i] > mostVotes)
      {
        mostVotes = votes[i]
        indexWithMostVotes = i
      }
    }
    return indexWithMostVotes
  }

  const doVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const indexWithMostVotes = getIndexWithMostVotes()
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} 
      <div>has {votes[selected]} votes.</div>
      <div>
        <button onClick={doVote}>vote</button>
        <button onClick={setRandomSelection}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexWithMostVotes]}
      <div>has {votes[indexWithMostVotes]} votes.</div>
    </div>
  )
}

export default App