import React from 'react'

const Notification = ({message, setMessage}) => {
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


export default Notification