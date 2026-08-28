import { useNavigate } from "react-router";

import blogService from "../services/blogs";

import { useAccessToken, useUsername } from "../store/loginStore";
import { useBlogActions } from "../store/blogStore";
import { useShowNotification } from "../store/notificationStore";

export const useManageBlogs = () => {
  // framework:
  const navigate = useNavigate();

  // global state (data):
  const accessToken = useAccessToken();
  const username = useUsername();

  // global state (actions):
  const { addBlog } = useBlogActions();

  // UI:
  const showNotification = useShowNotification();

  const executeCreateBlog = async (title, author, url) => {
    try {
      const response = await blogService.add(title, author, url, accessToken);
      const newBlog = {
        title,
        author,
        url,
        likes: 0,
        user: { username },
        id: response.data.id,
      };
      addBlog(newBlog);
      const isError = false;
      showNotification(`a new blog "${title}" by ${author} added.`, isError);

      navigate("/");
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  return { executeCreateBlog };
};
