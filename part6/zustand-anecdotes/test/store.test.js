import { it, expect, vi, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"

import { useAnecdoteActions, useAnecdotes, useAnecdoteStore } from "../src/store"
import { getAll } from "../src/services/anecdotes"

vi.mock('../src/services/anecdotes', () => ({
    getAll: vi.fn()
  }))

beforeEach(() => {
  // reset anecdotes list
  useAnecdoteStore.setState({ anecdotes: [] })
  // reset mocks that can affect the anecdote list, such as getAll, which is used for initialization
  vi.resetAllMocks()
})

it('state is initialized with anecdotes returned by the backend', async () => {
  // mock getAll function of the anecdotes service to return initialAnecdotes:
  const initialAnecdotes = [
    { content: 'Anecdote1', id: 1, votes: 41 },
    { content: 'Anecdote2', id: 2, votes: 16 }
  ]
  getAll.mockResolvedValue(initialAnecdotes)

  // call initialize function of the store to load anecdotes from (mocked) backend:
  const { result: actions } = renderHook(() => useAnecdoteActions())
  await act(async () => {
    await actions.current.initialize()
  })

  // verify that useAnecdotes() returns the anecdotes loaded on initialization:
  const { result } = renderHook(() => useAnecdotes())
  expect(result.current).toEqual(initialAnecdotes)
})


it('the store provides the anecdotes sorted by votes', async () => {
  // mock getAll function of the anecdotes service to return initialAnecdotes as follows (unsorted):
  const initialAnecdotes = [
    { content: 'Anecdote1', id: 1, votes: 16 },
    { content: 'Anecdote2', id: 2, votes: 41 },
    { content: 'Anecdote3', id: 3, votes: 52 }
  ]
  getAll.mockResolvedValue(initialAnecdotes)

  // call initialize function of the store to load anecdotes from (mocked) backend:
  const { result: actions } = renderHook(() => useAnecdoteActions())
  await act(async () => {
    await actions.current.initialize()
  })

  // verify that useAnecdotes() returns the anecdotes in sorted order
  const sortedAnecdotes = [
    { content: 'Anecdote3', id: 3, votes: 52 },
    { content: 'Anecdote2', id: 2, votes: 41 },
    { content: 'Anecdote1', id: 1, votes: 16 }
  ]
  const { result } = renderHook(() => useAnecdotes())
  expect(result.current).toEqual(sortedAnecdotes)
})