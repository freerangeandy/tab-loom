import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'

import TabEditor from '../components/TabEditor'

const TabPane = props => {
  const tab = props.tab
  const setTab = props.setTab
  const saveable = props.saveable
  const setSaveable = props.setSaveable
  const saveTab = props.saveTab

  const setTabContent = (content) => {
    setTab({
      ...tab,
      content: content
    })
  }

  const saveClickHandler = (event) => {
    saveTab()
    setSaveable(false)
  }

  let disabledSave = saveable ? {} : { disabled: 'disabled' }
  return (
    <>
      <h5>{tab.title}</h5>
      <TabEditor
        tabContent={tab.content}
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
