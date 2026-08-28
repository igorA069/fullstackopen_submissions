import { useNavigate } from "react-router";

import login from "../services/login";

import { useLoginActions } from "../store/loginStore";

import { useShowNotification } from "../store/notificationStore";

export const useAuth = () => {
  const navigate = useNavigate();

  const { setAccessToken, setUsername } = useLoginActions();

  const showNotification = useShowNotification();

  const executeLogin = async (username, password) => {
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

  const executeLogout = () => {
    window.localStorage.removeItem("blogApplication.loggedInUserName");
    window.localStorage.removeItem("blogApplication.accessToken");
    setUsername(null);
    setAccessToken(null);

    navigate("/");
  };

  return { executeLogin, executeLogout };
};
