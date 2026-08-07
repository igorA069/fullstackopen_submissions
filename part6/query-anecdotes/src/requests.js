export const getAll = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')
  if (!response.ok) {
    throw new Error('Unable to fetch the anecdotes from server')
  }
  const result = await response.json()
  return result
}