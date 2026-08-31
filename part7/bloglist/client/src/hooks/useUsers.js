import { useQuery } from "@tanstack/react-query";

import { requestAllUsers, requestUserById } from "../services/users";

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

export const useUserById = (id) => {
  const userByIdQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => requestUserById(id),
  });

  return {
    user: userByIdQuery.data,
    userQueryPending: userByIdQuery.isPending,
  };
};
