import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent'
import allActions from '../actions'

const IndexSidebar = props => {
  const dispatch = useDispatch()
  const tabList = useSelector(state => state.userTabs.list)
  const selectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const setTabList = (tabList) => {
    dispatch(allActions.tabsActions.setTabList(tabList))
  }
  const decrementSelectedIndex = () => {
    dispatch(allActions.tabsActions.decrementSelectedIndex())
  }

  const deletingSelectedAtEndOfList = (deleteIndex) => {
    return deleteIndex === selectedIndex && selectedIndex === tabList.length - 1
  }

  const deleteTabByIndex = (deleteIndex) => {
    const deleteId = tabList[deleteIndex].id
    fetch(`/api/v1/tablatures/${deleteId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
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
    .then(updatedList => {
      setTabList(updatedList)
      if (deleteIndex < selectedIndex || deletingSelectedAtEndOfList(deleteIndex)) {
        decrementSelectedIndex()
      }
    })
  }

  const indexContent = <IndexContent deleteTabByIndex={deleteTabByIndex} />
  return (
    <Sidebar
      sidebar={indexContent}
      docked={true}
      defaultSidebarWidth={0}
      rootClassName={'indexSidebar'}>
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
