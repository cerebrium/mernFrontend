import React, { useState, useEffect } from 'react'
import LeftNav from '../left/LeftNav'
import RightMain from '../right/RightMain'
import Nav from '../../nav/Nav'
import { ApolloListing } from '../../../../types'
import './home.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { 
  selectListings,
} from '../../../features/ListingsSlice'

const Home = () => {
  // local state
  const [selectedListing, setSelectedListing] = useState<ApolloListing>()
  const [listingArray, setListingArray] = useState<Array<ApolloListing>>([])
  
  // redux state
  const listings = useSelector(selectListings)

  // make the arrays for children
  useEffect(() => {
    if (listings) {
      setListingArray(Object.values(listings))
    }
  }, [listings])

  // function to return the selected listing
  const returnListing = (e: React.SyntheticEvent, listing: ApolloListing) => {
    // prevent bubbling
    e.preventDefault()

    // set the selected listing for viewing in the main component
    setSelectedListing(listing)
  }

  return (
    <div className="homeContainer">
      <div className="navContainer">
        <Nav />
      </div>
      <div className='leftNavContainer'>
        <h2>Listings</h2>
        <LeftNav
          listings={Array.from(listingArray)}
          returnListing={(e: React.SyntheticEvent, listing: ApolloListing) => returnListing(e, listing)}
        />
      </div>
      <div className="mainDisplay">
        <div className='buttonContainer'>
          {selectedListing ? <Link to={`/update/${selectedListing._id}`} className='linkText' id='edit'><button className='editButton'>Edit</button></Link> : null}
          {selectedListing ? <Link to={`/delete/${selectedListing._id}`} className='linkText' id='delete'><button className='deleteButton'>Delete</button></Link> : null}
        </div>
        <RightMain
          selectedListing={selectedListing}
        />
      </div>
    </div>
  )
}

export default Home
