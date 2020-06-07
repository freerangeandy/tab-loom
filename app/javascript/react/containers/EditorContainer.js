import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TabPane from '../components/TabContent/TabPane'
import { fetchSaveTab } from './FetchRequests'
import allActions from '../actions'

const EditorContainer = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const tabList = useSelector(state => state.userTabs.list)
  const tab = useSelector(state => state.tabEditor.tab)
  const tabSelectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const { tabsActions, editorActions } = allActions
  const setTab = (tab) => { dispatch(editorActions.setTab(tab)) }
  const updateInList = (tab) => { dispatch(tabsActions.updateInList(tab)) }

  useEffect(() => {
    setTab(tabList[tabSelectedIndex])
  },[tabList, tabSelectedIndex])

  const successCallback = (tab) => {
    setTab(tab)
    updateInList(tab)
  }
  const addNewTab = (tab) => { fetchSaveTab(successCallback, tab, "POST") }
  const updateTab = (tab, id) => { fetchSaveTab(successCallback, tab, "PATCH", `/${id}`) }
  const saveTab = () => {
    const tabPayload = {...tab, user_id: currentUser.id}
    if (tab.id === null)  addNewTab(tabPayload)
    else                  updateTab(tabPayload, tab.id)
  }

  return (
    <div className="editor-container">
      <TabPane saveTab={saveTab} />
    </div>
  )
}

export default EditorContainer
