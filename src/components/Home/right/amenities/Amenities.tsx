import React, { useMemo } from 'react'
import { Amenities } from '../../../../../types'
import './Amenities.css'


interface PropType {
  content: Array<Amenities> | undefined
}


const AmenitiesList = (props: PropType) => {
  const memoizedDescription = useMemo(() => {
    // check for content
    if (props.content) {

      // make a bullet point list of description
      let descriptionContent = (
        <ul>
          {props.content.map((amenity, amenityId) => <li key={ amenityId}>{amenity}</li>)}
        </ul>
      )

      // return the bullet pointed description
      return descriptionContent
    }
  }, [props.content])

  return (
    <div className="amenities">
      <h2>Amenities</h2>
      <h3>{memoizedDescription}</h3>
    </div>
  )
}

export default AmenitiesList