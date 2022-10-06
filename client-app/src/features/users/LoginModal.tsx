import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";

const LoginModal = () => {
	const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
	return (
		<>
			<Button onClick={onLoginOpen} variant="link">
				Login
			</Button>
			<Modal isOpen={isLoginOpen} onClose={onLoginClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<LoginForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default LoginModal;
