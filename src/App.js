import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const noteFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    setErrorMessage(null)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      console.log(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
    <h2>log in to application</h2>
    <ErrorNotification message={errorMessage} setMessage={setErrorMessage} />
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )

  const handleAddBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setMessage(`Added new blog: ${newBlog.title} by ${newBlog.author}`)
      return true
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      return false
    }
  }

  const handleLikeBlog = async (blog) => {

    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      const updatedBlog = await blogService.like(blog)
      const blogIndex = blogs.findIndex(item => item.id === updatedBlog.id)
      blogs.splice(blogIndex, 1)
      setBlogs(blogs.concat(updatedBlog))
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog)
      setBlogs(await blogService.getAll())
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
    }
  }

  if(user === null){
    return loginForm();
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} />
      <ErrorNotification message={errorMessage} setMessage={setErrorMessage} />
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <h2>add a new</h2>
      <Togglable buttonLabel="new blog" ref={noteFormRef}> 
        <AddBlog addBlog={handleAddBlog} />
      </Togglable>
      {
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} 
            loggedInUser={user}
            likeBlog={handleLikeBlog}
            removeBlog={handleRemoveBlog}
          />
        )
      }
    </div>
  )
}

export default App