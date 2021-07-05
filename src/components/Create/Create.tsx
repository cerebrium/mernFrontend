import React, { useState } from 'react'
import { ApolloListing } from '../../../types'
import Nav from '../nav/Nav'
import './Create.css'
import {
  useMutation,
  gql
} from "@apollo/client";

interface PropType {
  listings: Array<ApolloListing> | undefined
}

  // create query
  const ADD_APARTMENT = gql`
    mutation addApartment($name: String!, $email: String!, $location: String!, $image: String!, $description: String!, $amenities: [String]!) {
      name
      email
      location
      image
      amenities
      description
    }
  `

const Create = (props: PropType) => {
  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [amenities, setAmenities] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  // add apartment mutation
  const [addApartmentReact, {data}] = useMutation(ADD_APARTMENT)


  const handleSubmit = () => {
    console.log('submitting')
    let amenitiesArray: Array<string> = amenities.length > 0 ? amenities.split(" ") : []

    // add the apartment
    addApartmentReact(
      {
        variables:
        {
          name: name,
          email: email,
          location: location,
          image: image,
          description: description,
          amenities: amenitiesArray,
        }
      }
    ).then(response => {
      console.log(response)
    })
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
        <h1>Create A New Apartment Listing</h1>
        <div onChange={handleChange} className='formContainer'>
          <label>
            Name
          </label>
          <input type='text' defaultValue={name} id='name'/>
          <label>
            Email
          </label>
          <input type='text' defaultValue={email} id='email'/>
          <label>
            Location
          </label>
          <input type='text' defaultValue={location} id='location'/>
          <label>
            Image
          </label>
          <input type='text' defaultValue={image} id='image'/>
          <label>
            Description
          </label>
          <textarea defaultValue={description} className='description' id='description'/>
          <label>
            Amenities
          </label>
          <input type='text' defaultValue={amenities} id='amenities' />
          <button onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create