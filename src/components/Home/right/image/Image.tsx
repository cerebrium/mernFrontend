import React, { useMemo } from 'react'
import './Image.css'

interface PropType {
  img: string | undefined
}

const Image = (props: PropType) => {

  const memoizedImage = useMemo(() => {
    // check for content
    if (props.img) {

      // return the bullet pointed description
      return <img src={props.img} className='image' loading='lazy' alt='location or house' />
    }
  }, [props.img])

return (
  <div className='imageContainer'>
    {memoizedImage}
  </div>
  )
}

export default Image