export const getAll = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  const anecdotes = await response.json()
  return anecdotes
}