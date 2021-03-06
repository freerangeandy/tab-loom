import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalDeleteTab = (props) => {
  const {
    deleteClickedIndex,
    setDeleteClickedIndex,
    getDeleteTitleClicked,
    deleteTabByIndex,
    saveable,
    setSaveable
  } = props

  const handleConfirm = () => {
    deleteTabByIndex(deleteClickedIndex)
    setSaveable(false)
    setDeleteClickedIndex(null)
  }
  const handleCancel = () => {
    setDeleteClickedIndex(null)
  }

  const showModal = () => deleteClickedIndex !== null
  const unsavedWarning = saveable ? "You have unsaved changes in the tab editor which will be lost.\n" : null

  return (
    <>
      <Modal show={showModal()} onHide={handleCancel}>
        <Modal.Body>
          {unsavedWarning}
          Are you sure you want to delete '{getDeleteTitleClicked()}'?
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

export default ModalDeleteTab
