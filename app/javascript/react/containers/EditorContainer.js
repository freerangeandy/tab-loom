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

  const fetchSaveTab = (newTab, tabPayload) => {
    const tabPayloadWithUser = {...tabPayload, user_id: currentUser.id}
    if (newTab) fetchPostNewTab(tabPayloadWithUser)
    else fetchPatchTab(tabPayloadWithUser)
  }

  const fetchPostNewTab = (tabPayloadWithUser) => {
    fetch("/api/v1/tablatures", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(tabPayloadWithUser),
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

  const fetchPatchTab = (tabPayloadWithUser) => {
    fetch(`/api/v1/tablatures/${tabID}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(tabPayloadWithUser),
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
  if (tab != null) {
    tabPane = (
      <TabPane tablature={tab} fetchSaveTab={fetchSaveTab} />
    )
  }

  return (
    <div className="editorContainer" >
      {tabPane}
    </div>
  )
}

export default EditorContainer
