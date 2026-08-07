const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Unable to fetch the anecdotes from server')
  }
  const result = await response.json()
  return result
}

export const add = async (content) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, votes: 0 })
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to add new anecdote')
  }
  return await response.json()
}