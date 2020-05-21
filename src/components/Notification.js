import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div className="message">
      {message}
    </div>
  )
}

Notification.propTypes = {
  setMessage: PropTypes.func.isRequired
}

export default Notification