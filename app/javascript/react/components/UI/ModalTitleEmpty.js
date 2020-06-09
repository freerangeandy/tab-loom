import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalTitleEmpty = (props) => {
  const { showModal, setShowModal } = props
  const handleClose = () => setShowModal(false)

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Body>
        Tab title is invalid.<br />
        Please include at least one non-whitespace character.
      </Modal.Body>
      <Modal.Footer className="modal-button-area">
        <Button className="primary-button" variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalTitleEmpty
