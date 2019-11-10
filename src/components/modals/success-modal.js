import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const SuccessModal = ({ content, open, handleClose }) => {
  return (
    <Modal size="mini" open={open}>
      <Modal.Header>Success</Modal.Header>
      <Modal.Content>
        <p>{content || 'Successfully'}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleClose}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SuccessModal;
