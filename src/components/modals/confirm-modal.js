import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ConfirmModal = ({ content, open, handleClose, handleConfirm }) => {
  return (
    <Modal size="mini" open={open}>
      <Modal.Header>Confirmation</Modal.Header>
      <Modal.Content>
        <p>{content || 'Are you delete this item?'}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          Cancel
        </Button>
        <Button positive onClick={handleConfirm}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;
