import React from 'react'
import { ApolloListing } from '../../../types'
import Nav from '../nav/Nav'
import './Update.css'

interface PropType {
  listings: Array<ApolloListing> | undefined
}


const Update = (props: PropType) => {
  return (
    <div className='updateContainer'>
      <div className='navContainer'>
        <Nav />
      </div>
      <div className="content">

      </div>
    </div>
  )
}

export default Update