import CreateNew from '../components/CreateNew'
import anecdoteService from '../services/anecdotes'

import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => { setValue(event.target.value) }

  const reset = () => { setValue('') }

  return { type, value, onChange, reset }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])
  useEffect(() => {
    anecdoteService.getAll().then(response => setAnecdotes(response))
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return { anecdotes, addAnecdote }
}