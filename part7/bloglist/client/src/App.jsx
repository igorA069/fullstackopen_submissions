import { useState, useEffect } from "react";

import { useNavigate, useMatch } from "react-router";
import { Routes, Route, Link } from "react-router";

import { AppBar, Toolbar, Button, Typography } from "@mui/material";

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
import { useUsername, useLoginActions } from "./store/loginStore";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const showNotification = useShowNotification();
  const { addBlog, initBlogs, removeBlog, likeBlog } = useBlogActions();
  const username = useUsername();
  const { setUsername } = useLoginActions();

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

  const onCreateBlog = async (title, author, url) => {
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

  const match = useMatch("/blogs/:id");

  const padding = {
    padding: "5px",
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {username && (
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>
          )}
          {username ? (
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
                <CreateBlogForm onSubmit={onCreateBlog} />
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
