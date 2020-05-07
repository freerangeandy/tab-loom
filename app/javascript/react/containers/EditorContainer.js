import React, { useState, useEffect } from 'react'

import TabPane from '../components/TabPane'

const EditorContainer = props => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    role: "visitor"
  })
  const [tab, setTab] = useState(null)

  let tabID = 1 //props.match.params.id

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

  let tabPane
  if (tab != null) {
    tabPane = (<TabPane tablature={tab} />)
  }

  return (
    <div className="editorContainer" >
      {tabPane}
    </div>
  )
}

export default EditorContainer
