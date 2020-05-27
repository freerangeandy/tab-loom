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
  const clickActionText = clickIndex === NEW_TAB_INDEX ? "create a new tab" : "view this tab"

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
