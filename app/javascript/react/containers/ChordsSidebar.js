import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import ChordsContent from '../components/ChordsContent'
import allActions from '../actions'

const ChordsSidebar = props => {
  const dispatch = useDispatch()
  const [chordData, setChordData] = useState({ chordName: "", strings:"", fingering:"" })
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

  const getChordName = (root, quality, tension) => {
    if (quality.trim().length === 0 && tension.trim().length === 0) {
      return root
    } else {
      return `${root}_${quality}${tension}`
    }
  }

  useEffect(() => {
    const root = "F"
    const quality = "m"
    const tension = "7"
    fetchChord(root, quality, tension)
  }, [])

  const fetchChord = (root, quality, tension) => {
    const name = getChordName(root, quality, tension)
    // const fetchApi = `/api/v1/chords/F_maj7.json`

    fetch(`/api/v1/chords/${name}.json`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((chordBody) => {
      console.log(chordBody)
      setChordData(chordBody)
    })
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
