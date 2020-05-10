import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'

import TabEditor from './TabEditor'
import TabTitle from './TabTitle'

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

  const setTabTitle = (title) => {
    console.log("set title" + newTitle)
    setTab({
      ...tab,
      title: title
    })
  }

  const saveClickHandler = (event) => {
    saveTab()
    setSaveable(false)
  }

  let disabledSave = saveable ? {} : { disabled: 'disabled' }
  return (
    <>
      <TabTitle
        title={tab.title}
        setTabTitle={setTabTitle}
        setSaveable={setSaveable}
        />
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
