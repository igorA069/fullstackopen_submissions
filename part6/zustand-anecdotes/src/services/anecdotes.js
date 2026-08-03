const baseUrl = 'http://localhost:3001/anecdotes'
export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  const anecdotes = await response.json()
  return anecdotes
}

export const add = async (anecdote) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to add')
  }
  return await response.json()
}

export const update = async (id, anecdote) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'applications/json'
    },
    body: JSON.stringify(anecdote)
  }
  const response = await fetch(`${baseUrl}/${id}`, options)
  if (!response.ok) {
    throw new Error('Failed to update')
  }
  return await response.json()
}

export const remove = async (id) => {
  const options = {
    method: 'DELETE'
  }
  const response = await fetch(`${baseUrl}/${id}`, options)
  if (!response.ok) {
    throw new Error('Failed to delete')
  }
  return await response.json()
}