import { useQuery } from "@tanstack/react-query";

import { requestAllUsers } from "../services/users";

export const useUsers = () => {
  const allUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: requestAllUsers,
  });

  return {
    users: allUsersQuery.data,
    usersQueryPending: allUsersQuery.isPending,
  };
};
