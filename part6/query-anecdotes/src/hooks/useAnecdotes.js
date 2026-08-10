import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAll, add, vote } from "../requests"

export const useAnecdotes = () => {
  const queryClient = useQueryClient()  // do not create a new one here!

  const { data, isError, isPending } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: add,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], anecdotes => anecdotes.concat(newAnecdote))
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (updatedAnecdote) => queryClient.setQueryData(['anecdotes'],
      (anecdotes) => anecdotes.map(anecdote => (
        (anecdote.id === updatedAnecdote.id) ? updatedAnecdote : anecdote
      )))
  })

  return {
    anecdotes: data,
    isError,
    isPending,
    add: (content) => newAnecdoteMutation.mutate(content),
    vote: (anecdote) => voteAnecdoteMutation.mutate(anecdote)
  }
}
