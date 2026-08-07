import { useQuery } from "@tanstack/react-query"
import { getAll } from "../requests"

export const useAnecdotes = () => {

  const { data, isError, isPending } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  return { anecdotes: data, isError, isPending }
}
