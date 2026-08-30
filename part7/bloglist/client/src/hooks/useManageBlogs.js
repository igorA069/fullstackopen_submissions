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
  const { addBlogToStore, removeBlogFromStore, likeBlogInStore } =
    useBlogActions();

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
      addBlogToStore(newBlog);
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

  const executeLikeBlog = async (blog) => {
    try {
      await blogService.like(blog, accessToken);
      likeBlogInStore(blog.id);
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  const executeRemoveBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
      return;
    }
    try {
      await blogService.remove(blog, accessToken);
      removeBlogFromStore(blog.id);

      navigate("/");
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  return { executeCreateBlog, executeRemoveBlog, executeLikeBlog };
};
