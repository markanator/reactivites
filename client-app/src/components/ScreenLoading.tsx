import { Flex, Spinner, Text } from "@chakra-ui/react";

type Props = {
	inverted?: boolean;
	content?: string;
};

const ScreenLoading = ({ content = "Loading..." }: Props) => {
	return (
		<Flex
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			position="absolute"
			top={0}
			left={0}
			right={0}
			w="100vw"
			h="100vh"
		>
			<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
			<Text>{content}</Text>
		</Flex>
	);
};

export default ScreenLoading;
