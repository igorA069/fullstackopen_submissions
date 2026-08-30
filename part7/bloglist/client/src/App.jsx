import { useEffect } from "react";

import { Routes, Route, Link } from "react-router";

import { Menu } from "./components/Menu";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

import ErrorBoundary from "./ErrorBoundary";

import { useBlogActions } from "./store/blogStore";
import { useUsername, useLoginActions } from "./store/loginStore";

import { useManageBlogs } from "./hooks/useManageBlogs";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const username = useUsername();

  const { initBlogsInStore } = useBlogActions();

  const { setUsername, setAccessToken } = useLoginActions();

  const { executeLogin, executeLogout } = useAuth();

  const { executeCreateBlog, executeRemoveBlog, executeLikeBlog } =
    useManageBlogs();

  useEffect(() => {
    initBlogsInStore();
  });

  useEffect(() => {
    setUsername(
      window.localStorage.getItem("blogApplication.loggedInUserName"),
    );
    setAccessToken(window.localStorage.getItem("blogApplication.accessToken"));
  }, []);

  const isDeletable = (blog) => blog.user.username === username;

  return (
    <div>
      <Menu onLogout={executeLogout} />
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
                <LoginForm onSubmit={executeLogin} />
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                isLikeable={username != null}
                onClickLike={executeLikeBlog}
                isDeletable={isDeletable}
                onClickDelete={executeRemoveBlog}
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
