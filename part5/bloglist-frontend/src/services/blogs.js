import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async (title, author, url, accessToken) => {
  await axios.post(baseUrl, {title, author, url}, {headers: {Authorization: `Bearer ${accessToken}`}}) 
}

export default { getAll, add } 