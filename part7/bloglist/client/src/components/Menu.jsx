import { Link } from "react-router";

import { AppBar, Toolbar, Button, Typography } from "@mui/material";

import { useUsername } from "../store/loginStore";

export const Menu = ({ onLogout }) => {
  const username = useUsername();

  return (
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
          <Button color="inherit" onClick={onLogout}>
            logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
