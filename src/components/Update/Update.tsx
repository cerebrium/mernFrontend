import React, { useState, useEffect } from 'react'
import { ApolloListing } from '../../../types'
import Nav from '../nav/Nav'
import './Update.css'
import {
  useMutation,
  gql
} from "@apollo/client";

interface PropType {
  listings: Array<ApolloListing> | undefined
}

// create mutation
const UPDATE_APARTMENT = gql`
  mutation updateApartment($_id: ID!, $name: String!, $email: String!, $location: String!, $image: String!, $description: String!, $amenities: [String]!) {
    updateApartment(_id: $_id, name: $name, email: $email, location: $location, image: $image, description: $description, amenities: $amenities) {
      name
      email
      location
      image
      amenities
      description
    }
  }
  `;

const Update = (props: PropType) => {
  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [amenities, setAmenities] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [id, setId] = useState<string>('')

  // map the data from entry into state
  useEffect(() => {
    if (props.listings) {
      // find the key
      let keyArray = window.location.href.split("/")
      let key = keyArray[keyArray.length - 1]
  
      // find the entry that has the correct key
      let listing = props.listings.filter(listing => listing._id === key)

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
  }, [])

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
      )
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