import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Chord from './Chord'
import { getContentAfterChordInsert } from '../../shared/utility'
import { ROOTS, ALT_ROOTS, DISPLAY_VARIANT } from '../../shared/inStringConsts.js'
import allActions from '../../actions'

const ChordsContent = props => {
  const { column, tabContent, setTabContent, setSaveable, incrementColumn, loadChordList } = props
  const dispatch = useDispatch()
  const chordList =  useSelector(state => state.chords.list)
  const setHoverFrets = (frets) => { dispatch(allActions.chordsActions.setHoverFrets(frets)) }
  const resetHoverFrets = () => { dispatch(allActions.chordsActions.resetHoverFrets()) }

  useEffect(() => {
    loadChordList()
  }, [])

  const insertChord = (root, variant, frets) => {
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
                insertChord={insertChord}
                hoverHandler={() => setHoverFrets(chordStrings)}
              />)
    })
    return (<ButtonGroup size="sm">{chordGroup}</ButtonGroup>)
  }

  let rootChordList
  if (chordList != null) {
    rootChordList = ROOTS.map(root => {
      return (
        <li key={root} className="d-flex flex-row">
          <h5>{root}</h5>
          <div onMouseLeave={resetHoverFrets}>
            {chordButtonGroup(root)}
          </div>
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
