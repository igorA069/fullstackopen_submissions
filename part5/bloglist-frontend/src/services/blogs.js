import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async (title, author, url, accessToken) => {
  return await axios.post(baseUrl, {title, author, url}, {headers: {Authorization: `Bearer ${accessToken}`}}) 
}

const like = async (blog, accessToken) => {
  await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes: blog.likes + 1}, {headers: {Authorization: `Bearer ${accessToken}`}})
}

const remove = async(blog, accessToken) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {headers: {Authorization: `Bearer ${accessToken}`}})
}

export default { getAll, add, like, remove } 