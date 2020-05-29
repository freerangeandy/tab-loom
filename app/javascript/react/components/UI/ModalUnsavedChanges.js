import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { NEW_TAB_INDEX } from '../../shared/inStringConsts.js'

const ModalUnsavedChanges = (props) => {
  const { titleClickedIndex, setTitleClickedIndex, showNewTab, setTabSelectedIndex} = props

  const handleConfirm = () => {
    if (titleClickedIndex === NEW_TAB_INDEX) {
      showNewTab()
    } else {
      setTabSelectedIndex(titleClickedIndex)
    }
    setTitleClickedIndex(null)
  }
  const handleCancel = () => {
    setTitleClickedIndex(null)
  }
  const showModal = () => titleClickedIndex !== null
  const clickActionText = titleClickedIndex === NEW_TAB_INDEX ? "create a new tab" : "view this tab"

  return (
    <>
      <Modal show={showModal()} onHide={handleCancel}>
        <Modal.Body>
          You have unsaved changes in the tab editor which will be lost.<br />
          Do you still want to {clickActionText}?
        </Modal.Body>
        <Modal.Footer className="modal-button-area">
          <Button className="secondary-button" variant="secondary" onClick={handleCancel}>
            No
          </Button>
          <Button className="primary-button" variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUnsavedChanges
