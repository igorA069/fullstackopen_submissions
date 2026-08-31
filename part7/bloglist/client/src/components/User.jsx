import { useParams } from "react-router";

import { useUserById } from "../hooks/useUsers";

import { Typography } from "@mui/material";

export const User = () => {
  const params = useParams();
  const { user: userById, userQueryPending } = useUserById(params.id);

  if (userQueryPending) {
    return <>Please wait</>;
  }

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
