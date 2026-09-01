import { useField } from "../hooks/useField";

import { TextField, Button } from "@mui/material";

export const Comments = ({ comments, onAddComment }) => {
  const commentField = useField("add a comment");
  const { reset: _, ...commentFieldProps } = commentField;

  return (
    <>
      <h3>comments</h3>

      <form onSubmit={() => onAddComment(commentField.value)}>
        <TextField {...commentFieldProps} size="small" sx={{ mr: 1 }} />
        <Button variant="contained">add comment</Button>
      </form>

      {comments && comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </>
  );
};
