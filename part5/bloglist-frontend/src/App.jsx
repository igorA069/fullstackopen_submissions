import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [accessToken, setAccessToken] = useState(null)
  const [loggedInUserName, setLoggedInUserName] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    setLoggedInUserName(window.localStorage.getItem('blogApplication.loggedInUserName'))
  }, [])

  const logout = () => {
    window.localStorage.removeItem('blogApplication.loggedInUserName')
    setLoggedInUserName(null)
  }

  if (loggedInUserName) {
    // user is logged in
    return (
      <div>
        <h2>blogs</h2>
        <p>{loggedInUserName} logged in<button onClick={logout}>logout</button></p>
        <CreateBlogForm accessToken={accessToken}></CreateBlogForm>
        <br/>
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