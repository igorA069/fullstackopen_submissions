import axios from "axios";
const baseUrl = "/api/blogs";

const requestAllBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const requestAddBlog = async (title, author, url, accessToken) => {
  return await axios.post(
    baseUrl,
    { title, author, url },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

const requestLikeBlog = async (blog, accessToken) => {
  await axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

const requestCommentBlog = async (blog, comment, accessToken) => {
  console.log("ok");

  await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { content: comment },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
};

const requestRemoveBlog = async (blog, accessToken) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export default {
  requestAllBlogs,
  requestAddBlog,
  requestLikeBlog,
  requestCommentBlog,
  requestRemoveBlog,
};
