import { it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"

import { useAnecdoteActions, useAnecdotes } from "../src/store"
import { getAll } from "../src/services/anecdotes"

vi.mock('../src/services/anecdotes', () => ({
    getAll: vi.fn()
  }))

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