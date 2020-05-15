import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'

import TabEditor from './TabEditor'
import TabTitle from './TabTitle'
import allActions from '../actions'

const TabPane = props => {
  const saveTab = props.saveTab
  const dispatch = useDispatch()
  const saveable = useSelector(state => state.tabEditor.saveable)
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }

  const saveClickHandler = (event) => {
    saveTab()
    setSaveable(false)
  }

  let disabledSave = saveable ? {} : { disabled: 'disabled' }
  return (
    <>
      <TabTitle />
      <TabEditor />
      <Button
        className="save-button"
        variant="primary"
        size="md"
        {...disabledSave}
        onClick={(e) => saveClickHandler(e)}>
          Save
      </Button>
    </>
  )
}

export default TabPane
