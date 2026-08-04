import { it, expect, vi, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"

import { useAnecdoteActions, useAnecdotes, useAnecdoteStore } from "../src/store"
import { useFilterActions, useFilterStore } from "../src/store"

import { getAll, update } from "../src/services/anecdotes"


vi.mock('../src/services/anecdotes', () => {
  return {
    getAll: vi.fn(),
    update: vi.fn()
  }
})

beforeEach(() => {
  // reset anecdotes list
  useAnecdoteStore.setState({ anecdotes: [] })
  useFilterStore.setState({ filter: null })
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


it('the store provides filtered anecdotes', async () => {
  // mock getAll function of the anecdotes service to return initialAnecdotes as follows (unsorted):
  const initialAnecdotes = [
    { content: 'First anecdote', id: 1, votes: 16 },
    { content: 'Second anecdote', id: 2, votes: 41 }
  ]
  getAll.mockResolvedValue(initialAnecdotes)

  // call initialize function of the store to load anecdotes from (mocked) backend:
  const { result: actions } = renderHook(() => useAnecdoteActions())
  await act(async () => {
    await actions.current.initialize()
  })

  // set filter
  const { result: filterActions } = renderHook(() => useFilterActions())
  await act(async () => {
    await filterActions.current.setFilter('First')
  })

  // verify that useAnecdotes() returns filtered anecdotes
  const filteredAnecdotes = [
    { content: 'First anecdote', id: 1, votes: 16 }
  ]
  const { result } = renderHook(() => useAnecdotes())
  expect(result.current).toEqual(filteredAnecdotes)
})

it('voting increases the number of votes', async () => {
  // mock getAll function of the anecdotes service to return initialAnecdotes as follows :
  const initialAnecdotes = [
    { content: 'First anecdote', id: 1, votes: 16 }
  ]
  getAll.mockResolvedValue(initialAnecdotes)

  // call initialize function of the store to load anecdotes from (mocked) backend:
  const { result } = renderHook(() => useAnecdoteActions())
  await act(async () => {
    await result.current.initialize()
  })

  // mock the update function that only overwrites the anecdote on the server and returns it back
  update.mockImplementation(async (id, anecdote) => {
    return anecdote
  })

  // vote for id
  const { result: actions } = renderHook(() => useAnecdoteActions())
  await act(async () => { await actions.current.vote(1) })

  // check the store, that the vote count is increased
  const { result: anecdotes } = renderHook(() => useAnecdotes())
  expect(anecdotes.current).toHaveLength(1)
  expect(anecdotes.current[0].votes).toBe(17)
})