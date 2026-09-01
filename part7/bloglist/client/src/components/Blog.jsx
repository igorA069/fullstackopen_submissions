import { useParams } from "react-router";

import { useBlogById } from "../store/blogStore";

import { useManageBlogs } from "../hooks/useManageBlogs";

import { Paper, Button } from "@mui/material";

import { Comments } from "./Comments";

const Blog = ({ isLikeable, onClickLike, isDeletable, onClickDelete }) => {
  const params = useParams();
  const blog = useBlogById(params.id);

  const { executeCommentBlog } = useManageBlogs();

  const onAddComment = (comment) => {
    executeCommentBlog(blog, comment);
  };

  return (
    blog && (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <h2>{blog.title}</h2>
        <h3>by {blog.author}</h3>
        <a href={blog.url}>{blog.url}</a>
        <br />
        Added by {blog.user.name}
        <br />
        <br />
        {blog.likes} likes
        {isLikeable && (
          <Button
            onClick={() => onClickLike(blog)}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            like
          </Button>
        )}
        {isDeletable(blog) && (
          <Button
            onClick={() => onClickDelete(blog)}
            color="error"
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            remove
          </Button>
        )}
        <Comments comments={blog.comments} onAddComment={onAddComment} />
      </Paper>
    )
  );
};

export default Blog;
