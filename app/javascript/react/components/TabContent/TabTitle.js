import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormControl from 'react-bootstrap/FormControl'

import allActions from '../../actions'

const TabTitle = (props) => {
  const { enterPressHandler } = props
  const [editMode, setEditMode] = useState(false)
  const editTitleRef = useRef(null)
  const dispatch = useDispatch()
  const tabTitle = useSelector(state => state.tabEditor.tab.title)
  const { editorActions } = allActions
  const setTabTitle = (title) => { dispatch(editorActions.setTabTitle(title)) }
  const setSaveable = (saveable) => { dispatch(editorActions.setSaveable(saveable)) }

  const setTitleDefaultIfEmpty = (titleField) => {
    if (titleField.value.trim().length === 0) {
      setTabTitle("Untitled tab")
    }
  }

  const clickOutHandler = event => {
    if (editTitleRef.current && !editTitleRef.current.contains(event.target)) {
      setTitleDefaultIfEmpty(editTitleRef.current)
      setEditMode(false)
    }
  }
  const changeHandler = (event) => {
    setTabTitle(event.target.value)
    setSaveable(true)
  }

  const keyDownHandler = (event) => {
    if (event.key === 'Enter'){
      setTitleDefaultIfEmpty(editTitleRef.current)
      enterPressHandler()
      setEditMode(false)
    } else if (event.key === 'Tab') {
      setTitleDefaultIfEmpty(editTitleRef.current)
      setEditMode(false)
    }
  }

  let titleDisplay
  if (editMode) {
    titleDisplay = (
      <FormControl
        ref={editTitleRef}
        onChange={(e) => changeHandler(e)}
        onKeyDown={(e => keyDownHandler(e))}
        defaultValue={tabTitle} />
    )
    document.addEventListener("mousedown", clickOutHandler)
  } else {
    titleDisplay = <h5 onClick={()=> setEditMode(true)}>{tabTitle}</h5>
  }

  return (
    <div className="edit-title">
      {titleDisplay}
    </div>
  )
}

export default TabTitle
