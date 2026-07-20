import { useState, useEffect } from 'react'

import { useNavigate, useMatch } from 'react-router'
import { Routes, Route, Link } from 'react-router'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import login from './services/login'

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
      <Link style={padding} to='/'>blogs</Link>
      { username &&
        <Link style={padding} to='/create'>new blog</Link>
      }
      { username
        ? <button onClick={ logout }>logout</button>
        : <Link to='/login'>login</Link> }

      <Routes>
        <Route path='/' element={
          <Blogs blogs={blogs} />
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
                  isLikeable={ blog.user.username === username }
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
      </Routes>
    </div>
  )
}

export default App