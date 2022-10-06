import { Flex, Heading, ListItem, UnorderedList, useColorModeValue } from "@chakra-ui/react";
import Calendar from "react-calendar";

const ActivityFilters = () => {
	return (
		<>
			<Flex
				flexDir="column"
				p={4}
				bg={useColorModeValue("white", "gray.700")}
				boxShadow={"sm"}
				mb={8}
				mt={[0, 0, 16]}
			>
				<Heading
					as="h4"
					fontSize="2xl"
					mb={8}
					display="block"
					pos="relative"
					_after={{
						position: "absolute",
						bottom: "-15px",
						left: "0px",
						content: '""',
						width: "30px",
						height: "1px",
						backgroundColor: "#e86c60",
					}}
				>
					Filters
				</Heading>
				<UnorderedList listStyleType="none" m={0}>
					<ListItemWrapper>All Activities</ListItemWrapper>
					<ListItemWrapper>I&apos;m going</ListItemWrapper>
					<ListItemWrapper>I&apos;m hosting</ListItemWrapper>
				</UnorderedList>
			</Flex>
			<Calendar />
		</>
	);
};

const ListItemWrapper = ({ children }: { children?: React.ReactNode }) => {
	return (
		<ListItem
			display="flex"
			borderBottom="1px solid"
			borderColor="gray.300"
			fontWeight={500}
			_last={{
				border: "none",
			}}
			_first={{
				paddingTop: "0px",
			}}
			py={3}
		>
			{children}
		</ListItem>
	);
};

export default ActivityFilters;
