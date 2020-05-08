import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'

import TabEditor from '../components/TabEditor'

const TabPane = props => {
  const {title, content} = props.tab
  const saveable = props.saveable
  const setSaveable = props.setSaveable
  const saveTab = props.saveTab

  const setTabContent = (content) => {
    props.setTab({
      ...props.tab,
      content: content
    })
  }

  const saveClickHandler = (event) => {
    saveTab()
    setSaveable(false)
  }

  let disabledSave = saveable ? {} : {disabled: 'disabled'}
  return (
    <>
      <h5>{title}</h5>
      <TabEditor
        tabContent={content}
        setTabContent={setTabContent}
        setSaveable={setSaveable}
        />
      <Button
        className="saveButton"
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
