import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [accessToken, setAccessToken] = useState(null)
  const [loggedInUserName, setLoggedInUserName] = useState(null)
  const [notification, setNotification] = useState('')
  const [isNotificationError, setIsNotificationError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    setLoggedInUserName(window.localStorage.getItem('blogApplication.loggedInUserName'))
    setAccessToken(window.localStorage.getItem('blogApplication.accessToken'))
  }, [])

  const logout = () => {
    window.localStorage.removeItem('blogApplication.loggedInUserName')
    window.localStorage.removeItem('blogApplication.accessToken')
    setLoggedInUserName(null)
  }

  const showNotification = (message, isError) => {
    setNotification(message)
    setIsNotificationError(isError)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  if (loggedInUserName) {
    // user is logged in
    return (
      <div>
        <h2>blogs</h2>
        <Notification text={notification} isError={isNotificationError}/>
        <p>{loggedInUserName} logged in<button onClick={logout}>logout</button></p>
        <Togglable>
          <CreateBlogForm accessToken={accessToken} showNotification={showNotification} blogs={blogs} setBlogs={setBlogs} />
        </Togglable>
        <br/>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ) }
      </div>)
  } else {
    // no user logged in
    return (
      <div>
        <Notification text={notification} isError={isNotificationError}/>
        <LoginForm setAccessToken={setAccessToken} setLoggedInUserName={setLoggedInUserName} showNotification={showNotification} />
      </div>)
  }
}

export default App