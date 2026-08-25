import axios from 'axios'

const login = async (username, password) => {
  const resp = await axios.post('/api/login', { username, password })
  if (resp.status === 200) {
    return resp.data.accessToken
  }
}

export default login