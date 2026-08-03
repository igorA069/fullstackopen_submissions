import { useEffect } from 'react'

import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AnecdoteForm'
import Filter from './components/Filter'
import { useAnecdoteActions } from './store'

const App = () => {
  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App