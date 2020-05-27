import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { NEW_TAB_INDEX } from '../../shared/inStringConsts.js'

const ModalUnsavedChanges = (props) => {
  const { clickIndex, setClickIndex, showNewTab, setTabSelectedIndex} = props

  const handleConfirm = () => {
    if (clickIndex === NEW_TAB_INDEX) {
      showNewTab()
    } else {
      setTabSelectedIndex(clickIndex)
    }
    setClickIndex(null)
  }

  const handleCancel = () => {
    setClickIndex(null)
  }

  const showModal = () => clickIndex !== null

  let clickActionText
  if (clickIndex === NEW_TAB_INDEX) {
    clickActionText = "create a new tab"
  } else {
    clickActionText = "view this tab"
  }

  return (
    <>
      <Modal show={showModal()} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have unsaved work in the tab editor which will be lost.<br />Do you still want to {clickActionText}?</Modal.Body>
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

export default ModalUnsavedChanges
