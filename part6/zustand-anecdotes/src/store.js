
import { create } from 'zustand'
import { getAll, add, update, remove } from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  actions: {
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(anecdote => anecdote.id === id)
      const updatedAnecdote = await update(id, {...anecdote, votes: anecdote.votes + 1})
      set(state => ({ 
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote
      )}))
    },

    create: async (text) => {
      const newAnecdote = await add(asObject(text))
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },

    remove: async (id) => {
      await remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    },
    
    initialize: async () => {
      const newAnecdotes = await getAll()
      set(() => ({ anecdotes: newAnecdotes }))
    },
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  return anecdotes.toSorted((a, b) => (b.votes - a.votes))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

const useFilterStore = create(set => ({
  filter: null,
  actions: {
    setFilter: text => set(({filter: text}))
  }
}))

export const useFilter = () => useFilterStore(state => state.filter)
export const useFilterActions = () => useFilterStore(state => state.actions)

