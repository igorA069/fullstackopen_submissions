import { create } from "zustand";

import blogService from "../services/blogs";

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    addBlogToStore: (blog) =>
      set((state) => ({ blogs: state.blogs.concat(blog) })),
    initBlogsInStore: async () => {
      const newBlogs = await blogService.requestAllBlogs();
      set({ blogs: newBlogs });
    },
    removeBlogFromStore: (id) =>
      set((state) => ({ blogs: state.blogs.filter((blog) => blog.id !== id) })),
    likeBlogInStore: (id) =>
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 },
        ),
      })),
  },
}));

export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogById = (id) =>
  useBlogStore((state) => state.blogs.find((blog) => blog.id === id));

export const useBlogActions = () => useBlogStore((state) => state.actions);
