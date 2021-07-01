import React, {useMemo} from 'react'
import './Description.css'

interface PropType {
  content: String | undefined
}

const Description = (props: PropType) => {
  const memoizedDescription = useMemo(() => {
    // check for content
    if (props.content) {
      // split the content by periods
      let splitDescription = props.content.split(".")

      // filter out the empties
      let finalArray = splitDescription.filter( sentence => sentence.length > 1)

      // make a bullet point list of description
      let descriptionContent = (
        <ul>
          {finalArray.map((sentence, sentenceId) => <li key={ sentenceId}>{sentence}</li>)}
        </ul>
      )

      // return the bullet pointed description
      return descriptionContent
    }
  }, [props.content])

  return (
    <div className="description">
      <h2>Description</h2>
      <h3>{memoizedDescription}</h3>
    </div>
  )
}

export default Description