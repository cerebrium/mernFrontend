import React, {useState, useEffect} from 'react'
import { ApolloListing, ReduxListings } from '../../../types'
import { Redirect } from 'react-router-dom'
import Nav from '../nav/Nav'
import './Delete.css'
import {
  useMutation,
  gql
} from "@apollo/client";
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectListings,
  updateListing
} from '../../features/ListingsSlice'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

// type query as array
interface Data {
  listings: Array<ApolloListing>
};

// hashing function
const hasher = (array: Data): ReduxListings => {
  // instantiate the hash
  let hash: ReduxListings = {}

  // loop through and set key => uuid
  array.listings.forEach(listing => {
    hash[listing._id] = listing
  })

  // return the hash
  return hash
}

// create mutation
const DELETE_APARTMENT = gql`
  mutation deleteApartment($_id: ID!) {
    deleteApartment(_id: $_id) {
      _id
    }
  }
  `;

const Delete = () => {
  // local state
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [listingArray, setListingArray] = useState<Array<ApolloListing>>([])
  const [returnPage, setReturnPage] = useState<JSX.Element>()

  // add apartment mutation
  const [deleteApartmentReact, {data}] = useMutation(DELETE_APARTMENT)

  // redux state
  const listings = useSelector(selectListings)
  const dispatch = useDispatch()

  useEffect(() => {
    if (listings) {
      setListingArray(Object.values(listings))
    }
  }, [listings])

  // map the data from entry into state
  useEffect(() => {
    if (listingArray) {
      // find the key
      let keyArray = window.location.href.split("/")
      let key = keyArray[keyArray.length - 1]
  
      // find the entry that has the correct key
      let listing = listingArray.filter(listing => listing._id === key)

      // if found map it to state
      if (listing.length > 0) {
        setName(listing[0].name)
        setId(listing[0]._id)
      }
    }
  }, [listingArray])

  // handle deleting in database
  const handleDelete = () => {
    if (id) {
      deleteApartmentReact(
        {
          variables:
          {
            _id: id,
          }
        }
      )
    }
  }

  // handle change in redux on delete
  useEffect(() => {
    if (data) {
      // create array to push to redux
      let arrayToAdd: Array<ApolloListing> = [...Object.values(listings)]

      // remove deleted item
      let finalArray = arrayToAdd.filter( listing => listing._id !== id)

      // turn array into hash
      let hash = hasher({ listings: finalArray })

      dispatch(updateListing(hash))

      setReturnPage(
        <div className='returnPage'>
          <Link to='/' ><button>Return</button></Link>
        </div>
      )
    }
  }, [data])

  return (
    <div className='deleteContainer'>
      <div className='navContainer'>
        <Nav />
      </div>
      <div className="content">
        {returnPage}
        <h3>Delete: {name}</h3>
        <div className='buttonContainer'>
          <button onClick={handleDelete} id='yes'>Yes</button>
          <Link to='/'><button id='return'>Return</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Delete