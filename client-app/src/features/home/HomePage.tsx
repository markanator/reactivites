import { Flex, Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import LoginModal from "../users/LoginModal";
import RegisterModal from "../users/RegisterModal";

type Props = {};

const HomePage = (props: Props) => {
	const {
		userStore: { isLoggedIn },
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
				</Stack>
			)}
		</Flex>
	);
};

export default observer(HomePage);
