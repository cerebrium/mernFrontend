import React, { useState, useEffect } from 'react'
import { ApolloListing, ReduxListings } from '../../../types'
import Nav from '../nav/Nav'
import './Update.css'
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
const UPDATE_APARTMENT = gql`
  mutation updateApartment($_id: ID!, $name: String!, $email: String!, $location: String!, $image: String!, $description: String!, $amenities: [String]!) {
    updateApartment(_id: $_id, name: $name, email: $email, location: $location, image: $image, description: $description, amenities: $amenities) {
      _id
      name
      email
      location
      image
      amenities
      description
    }
  }
  `;

const Update = () => {
  // local state
  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [amenities, setAmenities] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [listingArray, setListingArray] = useState<Array<ApolloListing>>([])
  const [returnPage, setReturnPage] = useState<JSX.Element>()

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
        setDescription(listing[0].description)
        setLocation(listing[0].location)
        setImage(listing[0].image)
        setAmenities(listing[0].amenities.join(", "))
        setEmail(listing[0].email)
        setId(listing[0]._id)
      }
    }
  }, [listingArray])

  // add apartment mutation
  const [editApartmentReact, {data}] = useMutation(UPDATE_APARTMENT)

  const handleSubmit = () => {
    let amenitiesArray: Array<string> = amenities.length > 0 ? amenities.split(",") : []

    if (id.length > 1 && name.length > 1 && email.length > 1 && location.length > 1 && image.length > 1 && description.length > 1 && amenities.length > 1) {
      // add the apartment
      editApartmentReact(
        {
          variables:
          {
            _id: id,
            name: name,
            email: email,
            location: location,
            image: image,
            description: description,
            amenities: amenitiesArray,
          }
        }
      ).then(response => {
        
        // update redux
        let hash = hasher({ listings: [...listingArray] })

        // copy object
        let objectWithType = {
          _id: id,
          name: name,
          email: email,
          location: location,
          image: image,
          description: description,
          amenities: amenitiesArray,
        }

        if (hash.hasOwnProperty(objectWithType._id)) {
          let listingArrayCopy = [...listingArray]

          let newArray = listingArrayCopy.map(listing => {
            if (listing._id === objectWithType._id) {
              return objectWithType
            } else {
              return listing
            }
          })
          let newHash = hasher({ listings: newArray })
          dispatch(updateListing(newHash))
          setReturnPage(
            <div className='returnPage'>
              <Link to='/' ><button>Return</button></Link>
            </div>
          )
        }
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value)
        break;
      case 'location':
        setLocation(e.target.value)
        break;
      case 'image':
        setImage(e.target.value)
        break;
      case 'description':
        setDescription(e.target.value)
        break;
      case 'amenities':
        setAmenities(e.target.value)
        break;
    }
  }
  
  return (
    <div className='createContainer'>
      <div className='navContainer'>
        <Nav />
      </div>
      <div className='content'>
        {returnPage}
        <h1>Update </h1>
        <div onChange={handleChange} className='formContainer'>
          <label>
            Name
          </label>
          <input type='text' defaultValue={name} id='name' required/>
          <label>
            Email
          </label>
          <input type='text' defaultValue={email} id='email' required/>
          <label>
            Location
          </label>
          <input type='text' defaultValue={location} id='location' required/>
          <label>
            Image
          </label>
          <input type='text' defaultValue={image} id='image' required/>
          <label>
            Description
          </label>
          <textarea defaultValue={description} className='description' id='description' required/>
          <label>
            Amenities (seperate by commas)
          </label>
          <textarea defaultValue={amenities} id='amenities' required/>
          <button onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Update