import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import FretboardContent from '../components/FretboardContent/FretboardContent'

const FretboardContainer = (props) => {
  const currentUser = useSelector(state => state.currentUser)

  let fretboard
  if (currentUser.id !== null) {
    fretboard = <FretboardContent />
  }
  return (
    <>
      {fretboard}
    </>
  )
}

export default FretboardContainer
