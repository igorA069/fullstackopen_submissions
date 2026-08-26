import { useState, useEffect } from 'react'

import { useNavigate, useMatch } from 'react-router'
import { Routes, Route, Link } from 'react-router'

import { AppBar, Toolbar, Button, Typography } from '@mui/material'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import login from './services/login'

import ErrorBoundary from './ErrorBoundary'

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

  const navigate = useNavigate()

  const onLogin = async (username, password) => {
    // attempt to login
    try {
      const accessToken = await login(username, password)
      // if successfull, store the token
      setAccessToken(accessToken)
      setUsername(username)

      window.localStorage.setItem('blogApplication.loggedInUserName', username)
      window.localStorage.setItem('blogApplication.accessToken', accessToken)

      navigate('/')
    } catch (error) {
      const isError = true
      showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
    }
  }

  const onCreateBlog = async (title, author, url) => {
    try {
      const response = await blogService.add(title, author, url, accessToken)
      const newBlog = { title, author, url, likes: 0, user: { username }, id: response.data.id }
      setBlogs([...blogs, newBlog])
      const isError = false
      showNotification(`a new blog "${title}" by ${author} added.`, isError)

      navigate('/')
    } catch (error) {
      const isError = true
      showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
    }
  }

  const onLikeBlog = async (blog) => {
    try {
      await blogService.like(blog, accessToken)
      setBlogs(blogs.map(iterBlog => ((iterBlog.id === blog.id) ? { ...iterBlog, likes: iterBlog.likes + 1 } : iterBlog)))
    } catch(error) {
      const isError = true
      showNotification(`Status ${error.response.status}: ${JSON.stringify(error.response.data)}`, isError)
    }
  }

  const onDeleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
      return
    }
    try {
      await blogService.remove(blog, accessToken)
      setBlogs(blogs.filter(iterBlog => iterBlog.id !== blog.id))

      navigate('/')
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

    navigate('/')
  }

  const showNotification = (message, isError) => {
    setNotification(message)
    setIsNotificationError(isError)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const padding = {
    padding: '5px'
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color='inherit' component={ Link } to='/'>blogs</Button>
          { username &&
            <Button color='inherit' component={ Link } to='/create'>new blog</Button>
          }
          { username
            ? <Button color='inherit' onClick={ logout }>logout</Button>
            : <Button color='inherit' component={ Link } to='/login'>login</Button> }
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={
            <>
              <Notification text={notification} isError={isNotificationError}/>
              <Blogs blogs={blogs} />
            </>
          }/>
          <Route path='/login' element={
            <>
              <Notification text={notification} isError={isNotificationError}/>
              <LoginForm onSubmit={ onLogin }/>
            </>
          }/>
          <Route path='/blogs/:id' element={
            blog &&
                  <Blog
                    blog={blog}
                    isLikeable={ username != null }
                    onClickLike={ () => onLikeBlog(blog) }
                    isDeletable={ blog.user.username === username }
                    onClickDelete={ () => onDeleteBlog(blog) }
                  />}>
          </Route>
          <Route path='/create' element={
            <>
              <Notification text={notification} isError={isNotificationError}/>
              <CreateBlogForm onSubmit={ onCreateBlog } />
            </>
          }>
          </Route>
          <Route path='/*' element={
            <h2>404 - Page not found</h2>
          }/>
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App