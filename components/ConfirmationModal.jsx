import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalContent,
} from '@chakra-ui/react';

function ConfirmationModal(props) {
  const {
    isOpen,
    onClose,
    onConfirm,
    headerText,
    bodyText,
    confirmButtonText = 'confirm',
    confirmButtonColorScheme = 'primary',
  } = props;

  // Helper function to close the modal after running the onConfirm function.
  async function handleConfirmation() {
    // onConfirm might not be async, but it might so we need to account for the possibility.
    await onConfirm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={confirmButtonColorScheme} mr={4} onClick={handleConfirmation}>
            {confirmButtonText}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string,
  confirmButtonColorScheme: PropTypes.string,
};

export default ConfirmationModal;
