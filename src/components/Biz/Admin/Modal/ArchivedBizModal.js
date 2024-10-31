import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ArchiveBizModal = ({ show, handleClose, handleArchive, bizID }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Archive</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to archive this business?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleArchive(bizID)}>
          Archive
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArchiveBizModal;