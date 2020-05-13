import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Chord from './Chord'
import { getContentAfterChordInsert } from '../shared/utility'
import { ROOTS, DISPLAY_VARIANT } from '../shared/inStringConsts.js'

// const chordTypes = ["M", "m", "7", "m7", "M7", "sus2", "sus4", "dim"]
// const roots = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const ChordsContent = props => {
  const { column, tabContent, setTabContent, setSaveable, incrementColumn, chordList } = props

  const insertChord = (root, variant, frets) => {
    console.log(`${root}${variant} chord: [${frets.join(', ')}]`)
    const contentAfterInsert = getContentAfterChordInsert(tabContent, column, frets)
    setTabContent(contentAfterInsert)
    incrementColumn()
    setSaveable(true)
  }

  const chordButtonGroup = (root) => {
    const chordGroup = chordList.map(chord => {
      const chordStrings = chord.strings.split(' ')
      if (root == 'C') {
        return (<Chord
                  key={`${chord.name}`}
                  root={root}
                  variant={DISPLAY_VARIANT[chord.variant]}
                  frets={chordStrings}
                  insertChord={insertChord}/>)
      } else {
        return (<Chord
                  key={`${chord.name}`}
                  root={root}
                  variant={DISPLAY_VARIANT[chord.variant]}
                  frets={['X','X','X','X','X','X']}
                  insertChord={insertChord}/>)
      }
    })
    return (
      <ButtonGroup size="sm">
        {chordGroup}
      </ButtonGroup>
    )
  }

  let rootChordList
  if (chordList != null) {
    rootChordList = ROOTS.map(root => {
      return (
        <li key={root} className="d-flex flex-row">
          <h5>{root}</h5>
          {chordButtonGroup(root)}
        </li>
      )
    })
  }
        // <li className="d-flex flex-row">
        //   <h5>C</h5>
        //   <ButtonGroup size="sm">
        //     <Chord root="C" type="M" frets={['x', 3, 2, 0, 1, 0]} insertChord={insertChord}/>
        //     <Chord root="C" type="m" frets={['x', 3, 5, 5, 4, 3]} insertChord={insertChord}/>
        //     <Chord root="C" type="7" frets={['x', 3, 2, 4, 1, 0]} insertChord={insertChord}/>
        //     <Chord root="C" type="m7" frets={['x', 2, 1, 3, 1, 4]} insertChord={insertChord}/>
        //     <Chord root="C" type="M7" frets={[3, 4, 2, 0, 0, 0]} insertChord={insertChord}/>
        //     <Chord root="C" type="sus2" frets={['x', 3, 0, 0, 1, 4]} insertChord={insertChord}/>
        //     <Chord root="C" type="sus4" frets={['x', 2, 3, 0, 1, 4]} insertChord={insertChord}/>
        //     <Chord root="C" type="dim" frets={['x','x', 1, 2, 1, 2]} insertChord={insertChord}/>
        //   </ButtonGroup>
        // </li>
  return (
    <div >
      <h4>Chord List</h4>
      <ul>
        {rootChordList}
      </ul>
    </div>
  )
}

export default ChordsContent
