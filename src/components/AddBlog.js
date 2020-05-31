import React, { useState } from 'react'

const AddBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    if (await props.addBlog({ title, author, url })) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id='titleInput'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input id='authorInput'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input id='urlInput'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddBlog