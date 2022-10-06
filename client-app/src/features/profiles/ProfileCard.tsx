import {
	Center,
	useColorModeValue,
	Avatar,
	Text,
	Heading,
	Stack,
	Badge,
	Button,
	Box,
	Flex,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "~/types";

type Props = {
	profile: Profile;
};

const truncate = (str?: string) => {
	if (str) {
		return str.length > 40 ? str.substring(0, 37) + "..." : str;
	}
};

const ProfileCard = ({ profile }: Props) => {
	return (
		<Center>
			<Flex
				flexDir="column"
				w={"full"}
				maxW={"320px"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={4}
			>
				<Flex justifyContent="start" alignItems="flex-start">
					<Avatar
						size={"lg"}
						src={profile?.image || "/assets/user.png"}
						name={profile.displayName}
						mb={4}
						pos={"relative"}
					/>
					<Flex flexDir="column" ml={4}>
						<Heading fontSize={"2xl"} fontFamily={"body"}>
							{profile.displayName}
						</Heading>
						<Flex alignItems="baseline">
							<Text fontWeight={600} color={"gray.500"}>
								@{profile.username}
							</Text>
							<Flex alignItems="baseline" mt={1}>
								<Text ml={4} fontWeight={600}>
									{profile.followersCount}
								</Text>
								<Text ml={1} fontSize={"sm"} color={"gray.500"}>
									Followers
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Text color={useColorModeValue("gray.700", "gray.400")}>
					{truncate(profile?.bio) || "No bio."}
				</Text>
			</Flex>
		</Center>
	);
};

export default observer(ProfileCard);
