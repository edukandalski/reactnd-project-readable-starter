import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Home from 'react-icons/lib/fa/home'

class PageNotFound extends Component {
  render () {
    return (
      <div>
        <div className='not-found'>
          ERROR! PAGE NOT FOUND.
        </div>
        <div className='home-link'>
          <Link to='/' className='home-btn'>
            <Home size={50} />
          </Link>
        </div>
      </div>
    )
  }
}

export default PageNotFound