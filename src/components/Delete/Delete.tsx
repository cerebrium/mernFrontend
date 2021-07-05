import React from 'react'
import { ApolloListing } from '../../../types'
import Nav from '../nav/Nav'
import './Delete.css'

interface PropType {
  listings: Array<ApolloListing> | undefined
}

const Delete = (props: PropType) => {
  return (
    <div className='deleteContainer'>
      <div className='navContainer'>
        <Nav />
      </div>
      <div className="content">

      </div>

    </div>
  )
}

export default Delete