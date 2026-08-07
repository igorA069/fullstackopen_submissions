import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAll, add } from "../requests"

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

  return {
    anecdotes: data,
    isError,
    isPending,
    add: (content) => newAnecdoteMutation.mutate(content)
  }
}
