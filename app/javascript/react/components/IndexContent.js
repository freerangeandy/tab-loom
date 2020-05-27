import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import IndexItem from './IndexItem'
import allActions from '../actions'

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
    if (saveable) {
      setClickIndex(index)
    } else {
      if (index === -1) {
        showNewTab()
      } else {
        setTabSelectedIndex(index)
      }
    }
  }

  const handleConfirm = () => {
    if (clickIndex === -1) {
      showNewTab()
    } else {
      setTabSelectedIndex(clickIndex)
    }
    setClickIndex(null)
  }

  const handleCancel = () => {
    setClickIndex(null)
  }

  const showModal = () => {
    if (clickIndex === null) return false
    else                     return true
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
      <h5 className="new-tab" onClick={() => handleIndexClick(-1)}>+ New Tab</h5>
    )
  }

  return (
    <>
      <div>
        <h4>{currentUser.username}</h4>
        <ul>{tabDisplayList}</ul>
        {newTabButton}
      </div>
      <Modal show={showModal()} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have unsaved work in the tab editor which will be lost. Do you still want to (view this tab/create a new tab)?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Back
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IndexContent
