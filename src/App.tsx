import './App.css';
import Home from './components/Home/main/Home'
import Create from './components/Create/Create'
import Update from './components/Update/Update'
import Delete from './components/Delete/Delete'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { ApolloListing } from '../types'
import {
  useQuery,
  gql
} from "@apollo/client";

// get query
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

// type query as array
interface Data {
  getApartments: Array<ApolloListing>
};

function App() {

  // grab the data
  const { loading, error, data}= useQuery<Data>(
    getListings
  )


  return (
    loading ? <>'loading'</> : 
      <Router>
        <Route exact path="/" render={ () => <Home listings={data?.getApartments}/>}></Route>
        <Route exact path="/create" render={() => <Create listings={data?.getApartments}/>}></Route>
        <Route exact path="/update" render={() => <Update listings={data?.getApartments}/>}></Route>
        <Route exact path="/delete" render={() => <Delete listings={data?.getApartments}/>}></Route>
      </Router>
  );
}

export default App;
