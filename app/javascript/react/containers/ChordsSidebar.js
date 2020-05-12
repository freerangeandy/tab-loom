import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import ChordsContent from '../components/ChordsContent'
import allActions from '../actions'

const ChordsSidebar = props => {
  const dispatch = useDispatch()
  const column = useSelector(state => state.tabEditor.column)
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const setTabContent = (content) => {
    dispatch(allActions.editorActions.setTabContent(content))
  }
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }
  const incrementColumn = () => {
    dispatch(allActions.editorActions.incrementColumn())
  }

  const chordsContent = (
    <ChordsContent
      column={column}
      tabContent={tabContent}
      setTabContent={setTabContent}
      setSaveable={setSaveable}
      incrementColumn={incrementColumn} />
  )

  return (
    <Sidebar
      sidebar={chordsContent}
      docked={true}
      pullRight
      defaultSidebarWidth={0}
      rootClassName={'chordsSidebar'}>
      <div></div>
    </Sidebar>
  )
}

export default ChordsSidebar
