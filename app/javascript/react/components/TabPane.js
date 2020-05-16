import React, { Fragment, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'

import TabEditor from './TabEditor'
import TabTitle from './TabTitle'
import allActions from '../actions'

const TabPane = props => {
  const saveTab = props.saveTab
  const saveRef = useRef(null)
  const dispatch = useDispatch()
  const saveable = useSelector(state => state.tabEditor.saveable)
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }

  const saveClickHandler = (event) => {
    saveTab()
    setSaveable(false)
  }

  const enterPressHandler = () => {
    saveTab()
    setSaveable(false)
  }

  const setSaveFocus = () => {
    if (saveRef != null) {
      saveRef.current.focus()
    }
  }

  let disabledSave = saveable ? {} : { disabled: 'disabled' }
  return (
    <>
      <TabTitle enterPressHandler={enterPressHandler}/>
      <TabEditor setSaveFocus={setSaveFocus} saveClickHandler={saveClickHandler} />
      <Button
        className="save-button"
        variant="primary"
        size="md"
        ref={saveRef}
        {...disabledSave}
        onClick={(e) => saveClickHandler(e)}>
          Save
      </Button>
    </>
  )
}

export default TabPane
