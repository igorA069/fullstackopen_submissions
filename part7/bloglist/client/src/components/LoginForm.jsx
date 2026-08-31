import { useField } from "../hooks/useField";
import { Button, TextField } from "@mui/material";

const LoginForm = ({ onSubmit }) => {
  const usernameField = useField("username");
  const { reset: _resetUsernameField, ...usernameFieldProps } = usernameField;

  const passwordField = useField("password");
  const { reset: _resetPasswordField, ...passwordFieldProps } = passwordField;

  const internalOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(usernameField.value, passwordField.value);
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={(event) => internalOnSubmit(event)}>
        <div>
          <TextField {...usernameFieldProps} variant="standard" size="small" />
        </div>
        <div>
          <TextField
            {...passwordFieldProps}
            type="password"
            variant="standard"
            size="small"
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
