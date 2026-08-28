import { useEffect } from "react";

import { useNavigate } from "react-router";
import { Routes, Route, Link } from "react-router";

import { Menu } from "./components/Menu";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import login from "./services/login";

import ErrorBoundary from "./ErrorBoundary";

import { useShowNotification } from "./store/notificationStore";
import { useBlogActions } from "./store/blogStore";
import {
  useUsername,
  useAccessToken,
  useLoginActions,
} from "./store/loginStore";
import { useManageBlogs } from "./hooks/useManageBlogs";

const App = () => {
  const showNotification = useShowNotification();

  const { initBlogs, removeBlog, likeBlog } = useBlogActions();

  const username = useUsername();
  const { setUsername, setAccessToken } = useLoginActions();
  const accessToken = useAccessToken();

  const { executeCreateBlog } = useManageBlogs();

  useEffect(() => {
    initBlogs();
  });

  useEffect(() => {
    setUsername(
      window.localStorage.getItem("blogApplication.loggedInUserName"),
    );
    setAccessToken(window.localStorage.getItem("blogApplication.accessToken"));
  }, []);

  const navigate = useNavigate();

  const onLogin = async (username, password) => {
    // attempt to login
    try {
      const accessToken = await login(username, password);
      // if successfull, store the token
      setAccessToken(accessToken);
      setUsername(username);

      window.localStorage.setItem("blogApplication.loggedInUserName", username);
      window.localStorage.setItem("blogApplication.accessToken", accessToken);

      navigate("/");
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  const onLikeBlog = async (blog) => {
    try {
      await blogService.like(blog, accessToken);
      likeBlog(blog.id);
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  const onDeleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
      return;
    }
    try {
      await blogService.remove(blog, accessToken);
      removeBlog(blog.id);

      navigate("/");
    } catch (error) {
      const isError = true;
      showNotification(
        `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`,
        isError,
      );
    }
  };

  const logout = () => {
    window.localStorage.removeItem("blogApplication.loggedInUserName");
    window.localStorage.removeItem("blogApplication.accessToken");
    setUsername(null);
    setAccessToken(null);

    navigate("/");
  };

  const isDeletable = (blog) => blog.user.username === username;

  return (
    <div>
      <Menu onLogout={logout} />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Notification />
                <Blogs />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Notification />
                <LoginForm onSubmit={onLogin} />
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                isLikeable={username != null}
                onClickLike={onLikeBlog}
                isDeletable={isDeletable}
                onClickDelete={onDeleteBlog}
              />
            }
          ></Route>
          <Route
            path="/create"
            element={
              <>
                <Notification />
                <CreateBlogForm onSubmit={executeCreateBlog} />
              </>
            }
          ></Route>
          <Route path="/*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
