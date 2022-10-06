import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";

const RegisterModal = () => {
	const {
		isOpen: isRegisterOpen,
		onOpen: onRegisterOpen,
		onClose: onRegisterClose,
	} = useDisclosure();
	return (
		<>
			<Button onClick={onRegisterOpen} variant="link">
				Register
			</Button>
			<Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<RegisterForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default RegisterModal;
