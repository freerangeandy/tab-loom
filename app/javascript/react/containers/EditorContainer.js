import React, { useState, useEffect } from 'react'

import TabPane from '../components/TabPane'

const EditorContainer = props => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    role: "visitor"
  })
  const [tab, setTab] = useState(null)

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
      setTab(body.tablature)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const saveTab = (newTab, tabPayloadMissingUser) => {
    const tabPayload = {...tabPayloadMissingUser, user_id: currentUser.id}
    if (newTab) fetchSaveTab(tabPayload, "POST")
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

  let tabPane = tab ? <TabPane tablature={tab} saveTab={saveTab} /> : null

  return (
    <div className="editorContainer" >
      {tabPane}
    </div>
  )
}

export default EditorContainer
