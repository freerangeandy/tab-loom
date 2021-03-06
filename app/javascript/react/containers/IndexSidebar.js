import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent/IndexContent'
import { fetchDeleteTabByIndex } from './fetchHandlers'
import allActions from '../actions'

const IndexSidebar = props => {
  const showUserContent = props.showUserContent
  const dispatch = useDispatch()
  const tabList = useSelector(state => state.userTabs.list)
  const selectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const { tabsActions } = allActions
  const setTabList = (tabList) => { dispatch(tabsActions.setTabList(tabList)) }
  const decrementSelectedIndex = () => { dispatch(tabsActions.decrementSelectedIndex()) }

  const deletingSelectedAtEndOfList = (deleteIndex) => {
    return deleteIndex === selectedIndex && selectedIndex === tabList.length - 1
  }
  const successCallback = deleteIndex => updatedList => {
    setTabList(updatedList)
    if (deleteIndex < selectedIndex || deletingSelectedAtEndOfList(deleteIndex)) {
      decrementSelectedIndex()
    }
  }
  const deleteTabByIndex = fetchDeleteTabByIndex(successCallback, tabList)

  const indexContent = showUserContent
    ? <IndexContent deleteTabByIndex={deleteTabByIndex} />
    : (
      <div>
        <h4>Welcome, visitor!</h4>
        <a href="/users/sign_in"><h5 className="index-item">
          Sign in to add new tabs
        </h5></a>
      </div>
    )

  return (
    <Sidebar
      sidebar={indexContent}
      docked={true}
      defaultSidebarWidth={0}
      rootClassName={'index-sidebar'}>
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
