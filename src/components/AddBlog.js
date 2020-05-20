import React from 'react'

const AddBlog = (props) => {

  const handleTitleChange = (event) => {
    props.setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    props.setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    props.setUrl(event.target.value)
  }

  return (
    <>
      <form onSubmit={props.addBlog}>
        <div>
          Title:
          <input
            value={props.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={props.author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            value={props.url}
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