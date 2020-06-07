import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import ChordsContent from '../components/ChordsContent/ChordsContent'
import allActions from '../actions'
import { ROOTS, VARIANT } from '../shared/inStringConsts.js'

const ChordsSidebar = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const column = useSelector(state => state.tabEditor.column)
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const { chordsActions, editorActions } = allActions
  const setChordList  = (chords) => { dispatch(chordsActions.setChords(chords)) }
  const setTabContent = (content) => { dispatch(editorActions.setTabContent(content)) }
  const setSaveable = (saveable) => { dispatch(editorActions.setSaveable(saveable)) }
  const incrementColumn = () => { dispatch(editorActions.incrementColumn()) }

  const fetchChordList = () => {
    fetch(`/api/v1/chords.json`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => response.json())
    .then((chordBody) => {
      // console.log(chordBody)
      setChordList(chordBody)
    })
  }

  let chordsContent = <div></div>
  if (currentUser.id != null) {
    chordsContent = (
      <ChordsContent
        column={column}
        tabContent={tabContent}
        setTabContent={setTabContent}
        setSaveable={setSaveable}
        incrementColumn={incrementColumn}
        fetchChordList={fetchChordList} />
    )
  }

  return (
    <Sidebar
      sidebar={chordsContent}
      docked={true}
      pullRight
      defaultSidebarWidth={0}
      rootClassName={'chords-sidebar'}>
      <div></div>
    </Sidebar>
  )
}

export default ChordsSidebar
