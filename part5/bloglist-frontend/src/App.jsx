import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import login from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [accessToken, setAccessToken] = useState(null)
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState('')
  const [isNotificationError, setIsNotificationError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    setUsername(window.localStorage.getItem('blogApplication.loggedInUserName'))
    setAccessToken(window.localStorage.getItem('blogApplication.accessToken'))
  }, [])

  const onLogin = async (username, password) => {
    // attempt to login
    try {
        const accessToken = await login(username, password)
        // if successfull, store the token
        setAccessToken(accessToken)
        setUsername(username)

        window.localStorage.setItem('blogApplication.loggedInUserName', username)
        window.localStorage.setItem('blogApplication.accessToken', accessToken)
    } catch (error) {
        const isError = true
        showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('blogApplication.loggedInUserName')
    window.localStorage.removeItem('blogApplication.accessToken')
    setUsername(null)
    setAccessToken(null)
  }

  const showNotification = (message, isError) => {
    setNotification(message)
    setIsNotificationError(isError)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  if (username) {
    // user is logged in
    return (
      <div>
        <h2>blogs</h2>
        <Notification text={notification} isError={isNotificationError}/>
        <p>{username} logged in<button onClick={logout}>logout</button></p>
        <CreateBlogForm accessToken={accessToken} showNotification={showNotification} blogs={blogs} setBlogs={setBlogs} />
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
        <LoginForm onSubmit={ onLogin } />
      </div>)
  }
}

export default App