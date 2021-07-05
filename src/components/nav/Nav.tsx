import React from 'react'
import './Nav.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


const Nav = () => {
  return (
    <div className="navContent">
      <div className='link'>
        <Link to='/' className='linkText'>
            Home
        </Link>
      </div>
      <div className='link'>
        <Link to='/create' className='linkText'>
            Create
        </Link>
      </div>
      <div className='link'>
        <Link to='/update' className='linkText'>
              Update
        </Link>
      </div>
      <div className='link'>
        <Link to='/delete' className='linkText'>
            Delete
        </Link>
      </div>
    </div>
  )
}

export default Nav