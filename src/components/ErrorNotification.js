import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div className="error">
      {message}
    </div>
  )
}

ErrorNotification.propTypes = {
  setMessage: PropTypes.func.isRequired
}

export default ErrorNotification