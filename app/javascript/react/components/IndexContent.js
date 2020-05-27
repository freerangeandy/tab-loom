import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import IndexItem from './IndexItem'
import ModalUnsavedChanges from './UI/ModalUnsavedChanges'
import allActions from '../actions'
import { NEW_TAB_INDEX } from '../shared/inStringConsts.js'

const IndexContent = props => {
  const deleteTabByIndex = props.deleteTabByIndex
  const [clickIndex, setClickIndex] = useState(null)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const tabList = useSelector(state => state.userTabs.list)
  const tabSelectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const saveable = useSelector(state => state.tabEditor.saveable)
  const resetColumn = () => {
    dispatch(allActions.editorActions.resetColumn())
  }
  const setTabShown = (index) => {
    dispatch(allActions.editorActions.setTab(tabList[index]))
  }
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }

  const setTabSelectedIndex = (index) => {
    dispatch(allActions.tabsActions.setSelectedIndex(index))
    setTabShown(index)
    resetColumn()
    setSaveable(false)
  }
  const showNewTab = () => {
    setTabSelectedIndex(tabList.length)
    setTabShown(tabList.length)
    setSaveable(false)
  }

  const handleIndexClick = (index) => {
    if (index === tabSelectedIndex) return false
    if (saveable) {
      setClickIndex(index)
    } else {
      if (index === NEW_TAB_INDEX) {
        showNewTab()
      } else {
        setTabSelectedIndex(index)
      }
    }
  }

  let tabDisplayList
  if (tabList.length > 0) {
    tabDisplayList = tabList.map((tab, index) => {
      const indexItemClass = index === tabSelectedIndex ? "index-item-selected" : "index-item"
      return (
        <IndexItem
          key={tab.id}
          index={index}
          indexItemClass={indexItemClass}
          indexItemTitle={tab.title}
          deleteHandler={() => deleteTabByIndex(index)}
          clickHandler={() => handleIndexClick(index)} />
      )
    })
  }

  let newTabButton = (<a href="/users/sign_in"><h5 className="index-item">Sign in to add new tabs</h5></a>)
  if (currentUser.id != null) {
    newTabButton = (
      <h5 className="new-tab" onClick={() => handleIndexClick(NEW_TAB_INDEX)}>+ New Tab</h5>
    )
  }

  return (
    <>
      <div>
        <h4>{currentUser.username}</h4>
        <ul>{tabDisplayList}</ul>
        {newTabButton}
      </div>
      <ModalUnsavedChanges
        clickIndex={clickIndex}
        setClickIndex={setClickIndex}
        showNewTab={showNewTab}
        setTabSelectedIndex={setTabSelectedIndex}
      />
    </>
  )
}

export default IndexContent
