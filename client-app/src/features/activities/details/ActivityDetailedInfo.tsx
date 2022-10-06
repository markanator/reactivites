import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Activity } from "~/types";

type Props = {
	activity: Activity;
};
const ActivityDetailedInfo = ({ activity }: Props) => {
	return (
		<Flex
			flexDir="column"
			p={4}
			bg={useColorModeValue("white", "gray.700")}
			boxShadow={"sm"}
			mb={8}
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
				Description
			</Heading>
			<Text>{activity.description}</Text>
		</Flex>
	);
};

export default observer(ActivityDetailedInfo);
