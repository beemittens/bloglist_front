import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlog from './AddBlog'

test('<AddBlog /> ', () => {
  const addBlogHandler = jest.fn()

  const component = render(
    <AddBlog addBlog={addBlogHandler} />
  )

  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'title testing of forms could be easier' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'author testing of forms could be easier' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'url testing of forms could be easier' }
  })

  fireEvent.submit(form)

  expect(addBlogHandler.mock.calls).toHaveLength(1)
  expect(addBlogHandler.mock.calls[0][0].title).toBe('title testing of forms could be easier')
  expect(addBlogHandler.mock.calls[0][0].author).toBe('author testing of forms could be easier')
  expect(addBlogHandler.mock.calls[0][0].url).toBe('url testing of forms could be easier')
})