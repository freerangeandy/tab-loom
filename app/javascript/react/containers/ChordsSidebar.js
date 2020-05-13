import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import ChordsContent from '../components/ChordsContent'
import allActions from '../actions'

const ChordsSidebar = props => {
  const dispatch = useDispatch()
  const [chordList, setChordList] = useState([])
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
    const chordList = ["C", "C_m", "C_7", "C_m7", "C_maj7", "C_sus2", "C_sus4", "C_dim"]
    fetchChordList(chordList)
  }, [])

  const fetchChordList = (chordNameList) => {
    const paramsList = chordNameList.join(",")
    fetch(`/api/v1/chords/${paramsList}.json`)
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
      console.log(chordBody)
      setChordList(chordBody)
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
