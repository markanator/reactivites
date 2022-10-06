import {
	Avatar,
	Badge,
	Flex,
	Heading,
	ListItem,
	Text,
	UnorderedList,
	useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Activity, Profile } from "~/types";
import { AttendeeListItem } from "./Sidebar.helper";

type Props = {
	activity: Activity;
};

const ActivityDetailedSideBar = ({ activity }: Props) => {
	const { attendees, host, hostUsername } = activity;
	return (
		<Flex flexDir="column" p={4} bg={useColorModeValue("white", "gray.700")} boxShadow={"sm"}>
			<Flex mb={8} alignItems="center">
				<Heading
					as="h4"
					fontSize="2xl"
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
					Attendees
				</Heading>
				<Text pl={3} fontSize="sm" fontWeight="600">
					({attendees?.length || 0}) {attendees?.length === 1 ? "Person" : "People"} going
				</Text>
			</Flex>
			<UnorderedList listStyleType="none">
				{attendees?.map((attendee) => (
					<AttendeeListItem
						key={attendee.username}
						attendee={attendee}
						hostUsername={hostUsername}
					/>
				))}
			</UnorderedList>
		</Flex>
	);
};

export default observer(ActivityDetailedSideBar);
