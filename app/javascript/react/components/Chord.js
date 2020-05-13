import React from 'react'
import Button from 'react-bootstrap/Button'

const Chord = props => {
  const { root, variant, frets, insertChord } = props

  const clickHandler = (event) => {
    insertChord(root, variant, frets)
  }

  return (
    <Button variant="outline-warning" onClick={() => clickHandler()}>
      {variant}
    </Button>
  )
}

export default Chord
