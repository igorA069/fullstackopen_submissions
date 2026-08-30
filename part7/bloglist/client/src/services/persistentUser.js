import { useLoginStore } from "../store/loginStore";

export const getUser = () => {
  const { setUsername, setAccessToken } = useLoginStore.getState().actions; // getState() used here rather than a hook!

  setUsername(window.localStorage.getItem("blogApplication.loggedInUserName"));
  setAccessToken(window.localStorage.getItem("blogApplication.accessToken"));
};

export const saveUser = (username, accessToken) => {
  window.localStorage.setItem("blogApplication.loggedInUserName", username);
  window.localStorage.setItem("blogApplication.accessToken", accessToken);
};

export const removeUser = () => {
  window.localStorage.removeItem("blogApplication.loggedInUserName");
  window.localStorage.removeItem("blogApplication.accessToken");
};
