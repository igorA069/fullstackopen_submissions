import { create } from "zustand";

export const useLoginStore = create((set) => ({
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

export const useUsername = () => useLoginStore((state) => state.username);
export const useAccessToken = () => useLoginStore((state) => state.accessToken);

export const useLoginActions = () => useLoginStore((state) => state.actions);
