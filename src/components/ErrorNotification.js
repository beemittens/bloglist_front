import React from 'react'

const ErrorNotification = ({message, setMessage}) => {
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

export default ErrorNotification