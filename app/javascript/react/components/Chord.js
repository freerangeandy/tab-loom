import React from 'react'
import Button from 'react-bootstrap/Button'

const Chord = props => {
  const { root, type, frets, insertChord } = props

  const clickHandler = (event) => {
    insertChord(root, type, frets)
  }

  return (
    <Button onClick={() => clickHandler()}>
      {type}
    </Button>
  )
}

export default Chord
