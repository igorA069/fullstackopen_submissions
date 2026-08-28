import { create } from "zustand";

const useLogin = create((set) => ({
  username: "",
  actions: {
    setUsername: (newUsername) =>
      set({
        username: newUsername,
      }),
  },
}));

export const useUsername = () => useLogin((state) => state.username);
export const useLoginActions = () => useLogin((state) => state.actions);
