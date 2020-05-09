import React, { useState, useEffect } from 'react'

import TabPane from '../components/TabPane'

const EditorContainer = props => {
  const currentUser = props.currentUser
  const tab = props.tabShow
  const setTab = props.setTabShow

  const [saveable, setSaveable] = useState(false)

  const saveTab = () => {
    const tabPayload = {...tab, user_id: currentUser.id}
    if (tab.id === null)  fetchSaveTab(tabPayload, "POST")
    else                  fetchSaveTab(tabPayload, "PATCH", `/${tab.id}`)
  }

  const fetchSaveTab = (tabPayload, method, pathSuffix = "") => {
    fetch(`/api/v1/tablatures${pathSuffix}`, {
      credentials: "same-origin",
      method: method,
      body: JSON.stringify(tabPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(tab => {
      setTab(tab)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let tabPane
  if (currentUser.id != null) {
    tabPane = (
      <TabPane
        tab={tab}
        setTab={setTab}
        saveable={saveable}
        setSaveable={setSaveable}
        saveTab={saveTab}
      />
    )
  } else {
    tabPane = <h4>Sign in to begin editing</h4>
  }

  return (
    <div className="editorContainer">
      {tabPane}
    </div>
  )
}

export default EditorContainer
