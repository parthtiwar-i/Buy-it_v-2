import React from 'react'
import "./notFound.css"
import notFound from "./assets/404.jpg"
const NotFound = () => {
  return (
    <div className='notFound' >
        <img src={notFound} alt="Not Found" />
    </div>
  )
}

export default NotFound