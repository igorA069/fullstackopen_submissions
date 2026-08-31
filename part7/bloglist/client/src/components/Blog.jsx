import { Paper, Typography, Button } from "@mui/material";
import { useParams } from "react-router";

import { useBlogById } from "../store/blogStore";

const Blog = ({ isLikeable, onClickLike, isDeletable, onClickDelete }) => {
  const params = useParams();
  const blog = useBlogById(params.id);

  return (
    blog && (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          by {blog.author}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Added by {blog.user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
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
        </Typography>

        {blog.comments && blog.comments.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              comments
            </Typography>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          </>
        )}
      </Paper>
    )
  );
};

export default Blog;
