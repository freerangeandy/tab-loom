import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Chord from './Chord'

const chordTypes = ["M", "m", "7", "m7", "M7", "sus2", "sus4", "dim"]
const roots = [/*"C", */"C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const ChordsContent = props => {
  const messageMaker = (root, type, frets) => {
    return `${root} ${type} chord: [${frets.join(', ')}]`
  }

  const chordButtonGroup = (root) => {
    const chordList = chordTypes.map(type => {
      return <Chord key={`${root}${type}`} root={root} type={type} frets={['x', 'x', 'x', 'x', 'x', 'x']} messageMaker={messageMaker}/>
    })
    return (
      <ButtonGroup size="sm">
        {chordList}
      </ButtonGroup>
    )
  }

  const rootChordList = roots.map(root => {
    return (
      <li key={root} className="d-flex flex-row">
        <ButtonGroup size="sm">
          <h5>{root}</h5>
          {chordButtonGroup(root)}
        </ButtonGroup>
      </li>
    )
  })

  return (
    <div >
      <h4>Chord List</h4>
      <ul>
        <li className="d-flex flex-row">
          <h5>C</h5>
          <ButtonGroup size="sm">
            <Chord root="C" type="M" frets={['x', 3, 2, 0, 1, 0]} messageMaker={messageMaker}/>
            <Chord root="C" type="m" frets={['x', 3, 5, 5, 4, 3]} messageMaker={messageMaker}/>
            <Chord root="C" type="7" frets={['x', 3, 2, 4, 1, 0]} messageMaker={messageMaker}/>
            <Chord root="C" type="m7" frets={['x', 2, 1, 3, 1, 4]} messageMaker={messageMaker}/>
            <Chord root="C" type="M7" frets={[3, 4, 2, 0, 0, 0]} messageMaker={messageMaker}/>
            <Chord root="C" type="sus2" frets={['x', 3, 0, 0, 1, 4]} messageMaker={messageMaker}/>
            <Chord root="C" type="sus4" frets={['x', 2, 3, 0, 1, 4]} messageMaker={messageMaker}/>
            <Chord root="C" type="dim" frets={['x','x', 1, 2, 1, 2]} messageMaker={messageMaker}/>
          </ButtonGroup>
        </li>
        {rootChordList}
      </ul>
    </div>
  )
}

export default ChordsContent
