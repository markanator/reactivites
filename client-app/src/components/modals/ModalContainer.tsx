import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useStoreContext } from "~/stores/store";

type Props = {};

const ModalContainer = (props: Props) => {
  const { modalStore } = useStoreContext();

  return (
    <Modal isOpen={modalStore.modal.isOpen} onClose={modalStore.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {modalStore.modal.body}
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
