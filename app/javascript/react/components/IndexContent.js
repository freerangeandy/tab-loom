import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import IndexItem from './IndexItem'
import allActions from '../actions'

const IndexContent = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const tabList = useSelector(state => state.userTabs.list)
  const tabSelectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const setTabSelectedIndex = (index) => {
    dispatch(allActions.tabsActions.setSelectedIndex(index))
    setTabShown(index)
  }
  const setTabShown = (index) => {
    const tab = tabList[index]
    dispatch(allActions.editorActions.setTab(tab))
  }

  const showNewTab = () => {
    setTabSelectedIndex(tabList.length)
    setTabShown(tabList.length)
  }

  let tabDisplayList
  if (tabList.length > 0) {
    tabDisplayList = tabList.map((tab, index) => {
      const indexItemClass = index === tabSelectedIndex ? "indexItemSelected" : "indexItem"
      return (
        <IndexItem
          key={tab.id}
          index={index}
          indexItemClass={indexItemClass}
          indexItemTitle={tab.title}
          clickHandler={() => setTabSelectedIndex(index)} />
      )
    })
  }

  let newTabButton = <h5>Sign in to add new tabs</h5>
  if (currentUser.id != null) {
    newTabButton = (
      <h5 className="indexItem" onClick={() => showNewTab()}>+ New Tab</h5>
    )
  }

  return (
    <div>
      <h4>{currentUser.username}</h4>
      <ul>{tabDisplayList}</ul>
      {newTabButton}
    </div>
  )
}

export default IndexContent
