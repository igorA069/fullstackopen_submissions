import { useField } from "../hooks/useField";
import { TextField, Button } from "@mui/material";

const CreateBlogForm = ({ onSubmit }) => {
  const titleField = useField("title");
  const { reset: resetTitleField, ...titleFieldProps } = titleField;

  const authorField = useField("author");
  const { reset: resetAuthorField, ...authorFieldProps } = authorField;

  const urlField = useField("url");
  const { reset: resetUrlField, ...urlFieldProps } = urlField;

  const internalOnSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(titleField.value, authorField.value, urlField.value);
    resetTitleField();
    resetAuthorField();
    resetUrlField();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={internalOnSubmit}>
        <div>
          <TextField {...titleFieldProps} size="small" margin="dense" />
        </div>
        <div>
          <TextField {...authorFieldProps} size="small" margin="dense" />
        </div>
        <div>
          <TextField {...urlFieldProps} size="small" margin="dense" />
        </div>
        <div>
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
