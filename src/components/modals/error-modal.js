import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ErrorModal = ({ content, open, handleClose }) => {
  return (
    <Modal size="mini" open={open}>
      <Modal.Header>Notification</Modal.Header>
      <Modal.Content>
        <p>{content || 'Sorry, We`re down for maintenance'}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ErrorModal;
