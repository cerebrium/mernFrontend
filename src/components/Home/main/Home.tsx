import React, { useState } from 'react'
import LeftNav from '../left/LeftNav'
import RightMain from '../right/RightMain'
import { ApolloListing } from '../../../../types'
import './home.css'

interface PropType {
  listings: Array<ApolloListing> | undefined
}

const Home = (props: PropType) => {
  // local state
  const [selectedListing, setSelectedListing] = useState<ApolloListing>()
  
  // function to return the selected listing
  const returnListing = (e: React.SyntheticEvent, listing: ApolloListing) => {
    // prevent bubbling
    e.preventDefault()

    // set the selected listing for viewing in the main component
    setSelectedListing(listing)
  }

  return (
    <div className="homeContainer">
      <div className='leftNavContainer'>
        <h2>Listings</h2>
        <LeftNav
          listings={props.listings}
          returnListing={(e: React.SyntheticEvent, listing: ApolloListing) => returnListing(e, listing)}
        />
      </div>
      <div className="mainDisplay">
        <RightMain
          selectedListing={selectedListing}
        />
      </div>
    </div>
  )
}

export default Home
