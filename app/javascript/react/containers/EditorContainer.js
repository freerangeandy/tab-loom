import React, { useState, useEffect } from 'react'

import TabPane from '../components/TabPane'
import {BLANK_TAB} from '../shared/inStringConsts'

const EditorContainer = props => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    role: "visitor"
  })
  const [tab, setTab] = useState({
    id: null,
    title: "Untitled Tab",
    content: BLANK_TAB
  })
  const [isNewTab, setIsNewTab] = useState(true)
  const [saveable, setSaveable] = useState(false)

  let tabID = 1 //hard-coded, should be props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/tablatures/${tabID}.json`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.current_user !== null) {
        setCurrentUser(body.current_user)
      }
      setIsNewTab(false)
      setTab(body.tablature)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const saveTab = () => {
    const tabPayload = {...tab, user_id: currentUser.id}
    if (isNewTab) fetchSaveTab(tabPayload, "POST")
    else fetchSaveTab(tabPayload, "PATCH", `/${tabID}`)
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
    <div className="editorContainer" >
      {tabPane}
    </div>
  )
}

export default EditorContainer
