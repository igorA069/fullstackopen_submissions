import { create } from "zustand";

const useNotificationStore = create((set) => ({
  message: "",
  isError: false,
  actions: {
    setNotification: (newNotification, newIsError) => {
      set(() => ({
        message: newNotification,
        isError: newIsError,
      }));
      setTimeout(() => {
        set(() => ({
          message: "",
          isError: false,
        }));
      }, 3000);
    },
  },
}));

export const useNotification = () => {
  const message = useNotificationStore((state) => state.message);
  const isError = useNotificationStore((state) => state.isError);
  return { message, isError };
};

export const useShowNotification = () =>
  useNotificationStore((state) => state.actions.setNotification);
