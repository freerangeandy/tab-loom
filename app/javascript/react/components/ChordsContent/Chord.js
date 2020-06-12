import React from 'react'
import Button from 'react-bootstrap/Button'

const Chord = props => {
  const { root, variant, frets, insertChord, setHoverFrets } = props

  const clickHandler = (event) => {
    insertChord(root, variant, frets)
  }

  const hoverHandler = (event) => {
    setHoverFrets(frets)
  }

  return (
    <Button
      variant="outline-warning"
      onClick={() => clickHandler()}
      onMouseEnter={() => hoverHandler()}
    >
      {variant}
    </Button>
  )
}

export default Chord
