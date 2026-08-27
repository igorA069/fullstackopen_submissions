import { Alert } from "@mui/material";

import { useNotification } from "../store/notificationStore";

const Notification = () => {
  const { message, isError } = useNotification();

  if (message) {
    return (
      <Alert severity={isError ? "error" : "success"} sx={{ mt: 2 }}>
        {message}
      </Alert>
    );
  } else {
    return null;
  }
};

export default Notification;
