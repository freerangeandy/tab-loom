import React from 'react'
import Button from 'react-bootstrap/Button'

const Chord = props => {
  const { root, variant, frets, insertChord, hoverHandler } = props

  const clickHandler = (event) => {
    insertChord(root, variant, frets)
  }

  return (
    <Button
      variant="outline-warning"
      onClick={() => clickHandler()}
      onMouseEnter={hoverHandler}
    >
      {variant}
    </Button>
  )
}

export default Chord
