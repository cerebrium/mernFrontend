import React, { useEffect, useState} from 'react';
import requests from './functions/requests/requests'
import { Listing } from '../types'
import './App.css';
import Home from './components/Home/main/Home'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  const [ listings, setListings ] = useState<Array<Listing>>([])


  // grab the customers
  useEffect(() => {
    requests.get('listings').then(response => {
      if (response.length > 0) {
        setListings(response)
      }
    })
  }, [])

  return (
    <Router>
      <Route path="/">
        <Home listings={listings}/>
      </Route>
    </Router>
  );
}

export default App;
