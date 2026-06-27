import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [accessToken, setAccessToken] = useState(null)
  const [loggedInUserName, setLoggedInUserName] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (accessToken) {
    // user is logged in
    return (
      <div>
        <h2>blogs</h2>
        <p>{loggedInUserName} logged in</p>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ) }
      </div>)
  } else {
    // no user logged in
    return (
      <div>
        <LoginForm setAccessToken={setAccessToken} setLoggedInUserName={setLoggedInUserName}/>
      </div>)
  }
}

export default App