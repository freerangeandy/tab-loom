import React from 'react'
import Button from 'react-bootstrap/Button'
 
const Chord = props => {
  const { root, type, frets, messageMaker } = props

  const clickHandler = (event) => {
    console.log(messageMaker(root, type, frets))
  }

  return (
    <Button onClick={() => clickHandler()}>
      {type}
    </Button>
  )
}

export default Chord
