import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let likeHandler
  let removeHandler

  beforeEach(() => {
    const user = {
      username: 'Test user'
    }

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test author',
      url: 'Test url',
      likes: 5,
      user: user
    }

    likeHandler = jest.fn()
    removeHandler = jest.fn()

    component = render(
      <Blog
        blog={blog}
        loggedInUser={user}
        likeBlog={likeHandler}
        removeBlog={removeHandler}
      />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Test author'
    )
    expect(component.container).not.toHaveTextContent(
      'Test url'
    )
  })

  test('after clicking view button, details are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Test author'
    )
    expect(component.container).toHaveTextContent(
      'Test url'
    )
    expect(component.container).toHaveTextContent(
      'Test url'
    )
    expect(component.container).toHaveTextContent(
      'likes 5'
    )
  })

  test('clicking like button calls event handler', async () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})