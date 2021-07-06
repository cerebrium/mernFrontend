import React, { useEffect, useState } from 'react'
import './Left.css'
import { ApolloListing, Listings } from '../../../../types'

interface PropType {
  listings: Array<ApolloListing> | null
  returnListing: (e: React.SyntheticEvent, arg0: ApolloListing) => any;
}

const LeftNav = (props: PropType) => {
  const [ names, setNames] = useState<Array<JSX.Element>>()

  // display the categories
  useEffect(() => {
    if (props.listings) {
      setNames(props.listings.map((listing, listingId) => {
        // define the name
        let name = listing.name ? listing.name : 'test'

        // grab the title
        let stringToReturn = name.split(" ")
    
        // make the rest of the string lower case
        let arrayOfWords = stringToReturn.map(word => word.toLowerCase())
    
        // make the first letter capital
        let finalArray = arrayOfWords.map(lowerCaseWords => {
          if (lowerCaseWords[0]) {
            return `${lowerCaseWords[0].split("")[0].toUpperCase()}${lowerCaseWords.slice(1)}`
          } else {
            return lowerCaseWords
          }
        })
        
        // add the parent function to map the child element's data for selection
        return <p key={listingId} onClick={(e) => props.returnListing(e, listing)}>{finalArray.join(" ")}</p>
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.listings])

  return (
    <div className="leftContentContainer">
      {names}
    </div>
  )
}

export default LeftNav