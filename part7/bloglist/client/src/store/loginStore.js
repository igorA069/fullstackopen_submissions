import { create } from "zustand";

const useLogin = create((set) => ({
  username: "",
  accessToken: null,

  actions: {
    setUsername: (newUsername) =>
      set({
        username: newUsername,
      }),
    setAccessToken: (newAccessToken) =>
      set({
        accessToken: newAccessToken,
      }),
  },
}));

export const useUsername = () => useLogin((state) => state.username);
export const useAccessToken = () => useLogin((state) => state.accessToken);

export const useLoginActions = () => useLogin((state) => state.actions);
