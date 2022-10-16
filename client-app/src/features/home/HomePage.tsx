import { Button, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import LoginModal from "../users/LoginModal";
import RegisterModal from "../users/RegisterModal";

const HomePage = () => {
	const {
		userStore: { isLoggedIn, facebookLogin, isLoadingFacebook },
	} = useStoreContext();

	return (
		<Flex flexDir="column" justifyContent="center" alignItems="center" h="100vh">
			<Heading mb={4}>Reactivities</Heading>
			{isLoggedIn ? (
				<>
					<Heading mb={4}>Welcome back</Heading>
					<Link to="/activities">Go to activities!</Link>
				</>
			) : (
				<Stack spacing={6}>
					<LoginModal />
					<RegisterModal />
					<Divider />
					<Button colorScheme="facebook" onClick={facebookLogin} isLoading={isLoadingFacebook}>
						Login with Facebook
					</Button>
				</Stack>
			)}
		</Flex>
	);
};

export default observer(HomePage);
