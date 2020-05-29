import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalDeleteTab = (props) => {
  const { deleteIndexClicked, setDeleteIndexClicked, deleteTabByIndex } = props

  const handleConfirm = () => {
    deleteTabByIndex(deleteIndexClicked)
    setDeleteIndexClicked(null)
  }
  const handleCancel = () => {
    setDeleteIndexClicked(null)
  }

  const showModal = () => deleteIndexClicked !== null
  return (
    <>
      <Modal show={showModal()} onHide={handleCancel}>
        <Modal.Body>
          Are you sure you want to delete this tab?
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
