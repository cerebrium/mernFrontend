import React, { useEffect, useState} from 'react';
import './App.css';
import Home from './components/Home/main/Home'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { ApolloListing } from '../types'
import {
  useQuery,
  gql
} from "@apollo/client";

const getListings = gql`
  query getApartments {
    getApartments {
      name
      email
      location
      image
      description
      amenities
    }
  }
`

interface Data {
  getApartments: Array<ApolloListing>
};

function App() {

  const { loading, error, data}= useQuery<Data>(
    getListings
  )


  return (
    loading ? <>'loading'</> : 
      <Router>
        <Route path="/">
          <Home listings={data?.getApartments}/>
        </Route>
      </Router>
  );
}

export default App;
