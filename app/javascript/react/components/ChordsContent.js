import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Chord from './Chord'
import { getContentAfterChordInsert } from '../shared/utility'
import { ROOTS, ALT_ROOTS, DISPLAY_VARIANT } from '../shared/inStringConsts.js'

const ChordsContent = props => {
  const { column, tabContent, setTabContent, setSaveable, incrementColumn, fetchChordList } = props
  const chordList =  useSelector(state => state.chords)

  useEffect(() => {
    fetchChordList()
  }, [])

  const insertChord = (root, variant, frets) => {
    // console.log(`${root}${variant} chord: [${frets.join(', ')}]`)
    const contentAfterInsert = getContentAfterChordInsert(tabContent, column, frets)
    setTabContent(contentAfterInsert)
    incrementColumn()
    setSaveable(true)
  }

  const chordButtonGroup = (root) => {
    const chordRootList = chordList.filter(chord => (chord.root == root || chord.root == ALT_ROOTS[root]))
    const chordGroup = chordRootList.map(chord => {
      const chordStrings = chord.strings.split(' ')
      return (<Chord
                key={`${chord.name}`}
                root={ALT_ROOTS[root]}
                variant={DISPLAY_VARIANT[chord.variant]}
                frets={chordStrings}
                insertChord={insertChord}/>)
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
