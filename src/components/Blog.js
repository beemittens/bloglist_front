import React, { useState } from 'react'



const Blog = ({ blog, loggedInUser, likeBlog, removeBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const currentUserAdded = (blog) => {
    if (loggedInUser.username === blog.user.username) {
      return { display: '' }
    }

    return { display: 'none' }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  if (!showDetails) {
    return (
      <>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>view</button>
        </div>
      </>)
  }

  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={toggleDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div> 
        <div>{blog.author}</div>
        <button 
          style={currentUserAdded(blog)} 
          onClick={() => removeBlog(blog)}>
            remove
        </button>
      </div>
    </>)

}

export default Blog
