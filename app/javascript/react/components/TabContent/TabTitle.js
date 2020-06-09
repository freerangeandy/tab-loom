import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormControl from 'react-bootstrap/FormControl'

import ModalTitleEmpty from '../UI/ModalTitleEmpty'
import allActions from '../../actions'

const TabTitle = (props) => {
  const { enterPressHandler } = props
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const editTitleRef = useRef(null)
  const dispatch = useDispatch()
  const tabTitle = useSelector(state => state.tabEditor.tab.title)
  const { editorActions } = allActions
  const setTabTitle = (title) => { dispatch(editorActions.setTabTitle(title)) }
  const setSaveable = (saveable) => { dispatch(editorActions.setSaveable(saveable)) }

  const titleInvalid = (title) => {
    if (title.trim().length === 0) {
      setShowModal(true)
      return true
    } else {
      return false
    }
  }

  const clickOutHandler = event => {
    if (editTitleRef.current && !editTitleRef.current.contains(event.target)) {
      if (titleInvalid(editTitleRef.current.value)) return
      setEditMode(false)
    }
  }
  const changeHandler = (event) => {
    setTabTitle(event.target.value)
    setSaveable(true)
  }

  const keyDownHandler = (event) => {
    if (event.key === 'Enter'){
      if (titleInvalid(editTitleRef.current.value)) return
      setEditMode(false)
      enterPressHandler()
    } else if (event.key === 'Tab') {
      if (titleInvalid(editTitleRef.current.value)) return
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
    <>
      <div className="edit-title">
        {titleDisplay}
      </div>
      <ModalTitleEmpty
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}

export default TabTitle
