import { useUsers } from "../hooks/useUsers";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

export const Users = () => {
  const { users, usersQueryPending } = useUsers();

  if (usersQueryPending) {
    return <>Please wait</>;
  }

  return (
    <>
      <Typography variant="h4">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
