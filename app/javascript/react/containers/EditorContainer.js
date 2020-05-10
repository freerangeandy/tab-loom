import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TabPane from '../components/TabPane'
import allActions from '../actions'

const EditorContainer = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const tabList = useSelector(state => state.userTabs.list)
  const tab = useSelector(state => state.tabEditor.tab)
  const tabSelectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const setTab = (tab) => { dispatch(allActions.editorActions.setTab(tab)) }
  const updateInList = (tab) => { dispatch(allActions.tabsActions.updateInList(tab)) }

  useEffect(() => {
    setTab(tabList[tabSelectedIndex])
  },[tabList])

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
      updateInList(tab)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let tabPane
  if (currentUser.id != null) {
    tabPane = (
      <TabPane saveTab={saveTab} />
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
