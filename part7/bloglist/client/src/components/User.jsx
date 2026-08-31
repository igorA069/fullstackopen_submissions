import { useParams } from "react-router";

import { useUsers } from "../hooks/useUsers";

import { Typography } from "@mui/material";

export const User = () => {
  const params = useParams();
  const { users, usersQueryPending } = useUsers();

  if (usersQueryPending) {
    return <>Please wait</>;
  }

  const userById = users.find((user) => user.id === params.id);
  const userBlogs = userById.blogs;
  return (
    <>
      <Typography variant="h4">{userById.username}</Typography>
      <Typography variant="h6">added blogs</Typography>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};
