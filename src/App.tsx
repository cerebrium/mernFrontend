import React, { useEffect } from 'react'
import './App.css';
import Home from './components/Home/main/Home'
import Create from './components/Create/Create'
import Update from './components/Update/Update'
import Delete from './components/Delete/Delete'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { ApolloListing, ReduxListings } from '../types'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useDispatch } from 'react-redux';
import { 
  addListings
} from './features/ListingsSlice'

// hashing function
const hasher = (array: Data): ReduxListings => {
  // instantiate the hash
  let hash: ReduxListings = {}

  // loop through and set key => uuid
  array.getApartments.forEach(listing => {
    hash[listing._id] = listing
  })

  // return the hash
  return hash
}

// get query
const getListings = gql`
  query getApartments {
    getApartments {
      _id
      name
      email
      location
      image
      description
      amenities
    }
  }
`

// type query as array
interface Data {
  getApartments: Array<ApolloListing>
};

function App() {
  // redux
  const dispatch = useDispatch()

  // grab the data
  const { loading, error, data}= useQuery<Data>(
    getListings
  )

  // mao the data to the redux slice
  useEffect(() => {
    if (data) {
      // create the hash
      let hash = hasher(data)

      // submit hash to redux slice
      dispatch(addListings(hash))
    }
  }, [data])

  return (
    loading ? <>'loading'</> : 
      <Router>
        <Route exact path="/" render={ () => <Home />}></Route>
        <Route exact path="/create" render={() => <Create />}></Route>
        <Route path="/update/:id" render={() => <Update />}></Route>
        <Route path="/delete/:id" render={() => <Delete />}></Route>
      </Router>
  );
}

export default App;
