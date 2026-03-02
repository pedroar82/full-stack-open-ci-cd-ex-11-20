import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({ message: null, class: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMessage = (message, mclass) => {
    setErrorMessage({ message: message, class: mclass })
    setTimeout(() => {
      setErrorMessage({ message: null, class: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password','error')
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try{
      const addedBlog = { ...newBlog, user: user.id }
      const response = await blogService.create(addedBlog)
      setBlogs(blogs
        .concat(response)
        .sort((a,b) => b.likes - a.likes))
      setMessage(`a new blog ${response.title} by ${response.author} added`, 'success' )
    } catch (error) {
      setMessage(`error adding new blog: ${error.message}`, 'error')
    }
  }

  const updateBlog = async (updatedBlogId, likes) => {
    try{
      const blog = blogs.find(b => b.id === updatedBlogId)

      //it only updates the blog likes, the user remains the same that has created~the blog
      const updatedBlog =
       { ...blog,
         likes: likes }
      const response = await blogService.update(updatedBlog)

      setBlogs(blogs
        .map(blog => blog.id === response.id ? response : blog)
        .sort((a,b) => b.likes - a.likes))
      setMessage(`Liked blog ${response.title} by ${response.author}`, 'success' )
    } catch (error) {
      setMessage(`error liking blog: ${error.message}`, 'error')
    }
  }

  const deleteBlog = async (deletedBlogId) => {
    try{
      const _response = await blogService.deleteBlog(deletedBlogId) /* eslint-env no-unused-vars */
      setBlogs(blogs
        .filter(blog => blog.id !== deletedBlogId)
        .sort((a,b) => b.likes - a.likes))
      setMessage('Deleted blog', 'success' )
    } catch (error) {
      setMessage(`error deleting blog: ${error.message}`, 'error')
    }
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage.message} className={errorMessage.class} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUserChange={e => setUsername(e.target.value)}
          handlePassChange={e => setPassword(e.target.value)} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage.message} className={errorMessage.class} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          userId={user.id} />
      )}
    </div>
  )
}

export default App