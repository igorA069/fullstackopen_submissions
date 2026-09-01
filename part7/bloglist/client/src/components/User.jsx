import { useParams } from "react-router";

import { useUserById } from "../hooks/useUsers";

export const User = () => {
  const params = useParams();
  const { user: userById, userQueryPending } = useUserById(params.id);

  if (userQueryPending) {
    return <>Please wait</>;
  }

  const userBlogs = userById.blogs;
  return (
    <>
      <h2>{userById.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};
