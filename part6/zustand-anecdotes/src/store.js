
import { create } from 'zustand'
import { getAll } from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  actions: {
    vote: id => set(state => ({ 
      anecdotes: state.anecdotes.map(
        anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
      )})),

    create: text => set(state => ({
      anecdotes: state.anecdotes.concat(asObject(text))
    })),

    initialize: async () => {
      const newAnecdotes = await getAll()
      set(() => ({ anecdotes: newAnecdotes }))
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

const useFilterStore = create(set => ({
  filter: null,
  actions: {
    setFilter: text => set(({filter: text}))
  }
}))

export const useFilter = () => useFilterStore(state => state.filter)
export const useFilterActions = () => useFilterStore(state => state.actions)

