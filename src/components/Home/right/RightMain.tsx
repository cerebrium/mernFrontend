import React, { useMemo, useEffect } from 'react'
import { ApolloListing } from '../../../../types'
import Description from './description/Description'
import Amenities from './amenities/Amenities'
import Image from './image/Image'
import './Right.css'

interface PropType {
  selectedListing: ApolloListing | undefined
}

const RightMain = (props: PropType) => {

  // map the data to the components
  // display the categories
  const memoizedContent = useMemo(() => {
    if (props.selectedListing) {

      // add title
      let title = <h1 className="contentTitle">{props.selectedListing.name}</h1>

      
      // object to return
      let finalObject = (
        <>
          {title}
          <Description content={props.selectedListing.description} />
          <Image img={props.selectedListing.image}/>
          <Amenities content={props.selectedListing.amenities} />
        </>
      )
      return finalObject
    }
  }, [props.selectedListing])

  return (
    <>
      {memoizedContent}
    </> 
  )
}

export default RightMain