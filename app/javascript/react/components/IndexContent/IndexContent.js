import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import IndexItem from './IndexItem'
import ModalUnsavedChanges from '../UI/ModalUnsavedChanges'
import ModalDeleteTab from '../UI/ModalDeleteTab'
import allActions from '../../actions'
import { NEW_TAB_INDEX } from '../../shared/inStringConsts.js'

const IndexContent = props => {
  const deleteTabByIndex = props.deleteTabByIndex
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const tabList = useSelector(state => state.userTabs.list)
  const tabSelectedIndex = useSelector(state => state.userTabs.selectedIndex)
  const titleClickedIndex = useSelector(state => state.userTabs.titleClickedIndex)
  const deleteClickedIndex = useSelector(state => state.userTabs.deleteClickedIndex)
  const saveable = useSelector(state => state.tabEditor.saveable)
  const { tabsActions, editorActions } = allActions
  const setTitleClickedIndex = (index) => { dispatch(tabsActions.setTitleClickedIndex(index)) }
  const setDeleteClickedIndex = (index) => { dispatch(tabsActions.setDeleteClickedIndex(index)) }
  const resetColumn = () => { dispatch(editorActions.resetColumn()) }
  const setTabShown = (index) => { dispatch(editorActions.setTab(tabList[index])) }
  const setSaveable = (saveable) => { dispatch(editorActions.setSaveable(saveable)) }

  const setTabSelectedIndex = (index) => {
    dispatch(tabsActions.setSelectedIndex(index))
    setTabShown(index)
    resetColumn()
    setSaveable(false)
  }
  const showNewTab = () => {
    setTabSelectedIndex(tabList.length)
    setTabShown(tabList.length)
    setSaveable(false)
  }

  const handleTitleClick = (index) => {
    if (index === tabSelectedIndex) return false
    if (saveable) {
      setTitleClickedIndex(index)
    } else {
      if (index === NEW_TAB_INDEX) {
        showNewTab()
      } else {
        setTabSelectedIndex(index)
      }
    }
  }
  const handleDeleteClick = (index) => { setDeleteClickedIndex(index) }
  const getDeleteTitleClicked = () => {
    if (deleteClickedIndex === null) return null
    return tabList[deleteClickedIndex].title
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
          deleteHandler={() => handleDeleteClick(index)}
          clickHandler={() => handleTitleClick(index)} />
      )
    })
  }

  return (
    <>
      <div>
        <h4>{currentUser.username}</h4>
        <ul>{tabDisplayList}</ul>
        <h5 className="new-tab" onClick={() => handleTitleClick(NEW_TAB_INDEX)}>
          + New Tab
        </h5>
      </div>
      <ModalUnsavedChanges
        titleClickedIndex={titleClickedIndex}
        setTitleClickedIndex={setTitleClickedIndex}
        showNewTab={showNewTab}
        setTabSelectedIndex={setTabSelectedIndex}
      />
      <ModalDeleteTab
        deleteClickedIndex={deleteClickedIndex}
        setDeleteClickedIndex={setDeleteClickedIndex}
        getDeleteTitleClicked={getDeleteTitleClicked}
        deleteTabByIndex={deleteTabByIndex}
      />
    </>
  )
}

export default IndexContent
