import { EmailIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Heading,
	ListItem,
	Text,
	UnorderedList,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import Calendar from "react-calendar";

type Props = {};

const ActivityFilters = (props: Props) => {
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
					<ListItemWrapper>I'm going</ListItemWrapper>
					<ListItemWrapper>I'm hosting</ListItemWrapper>
				</UnorderedList>
			</Flex>
			<Calendar />
		</>
	);
};

const ListItemWrapper = ({ children }: any) => {
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
