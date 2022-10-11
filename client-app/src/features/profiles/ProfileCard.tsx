import { Avatar, Center, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Profile } from "~/types";
import FollowButton from "./FollowButton";

type Props = {
	profile: Profile;
	showFollowButtons?: boolean;
};

const truncate = (str?: string) => {
	if (str) {
		return str.length > 30 ? str.substring(0, 30) + "..." : str;
	}
};

const ProfileCard = ({ profile, showFollowButtons }: Props) => {
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
				<Flex w="full" h="full">
					{showFollowButtons && (
						<FollowButton
							stackProps={{ h: "full", maxH: "180px" }}
							unfollowProps={{ size: "sm", mt: 2 }}
							followProps={{ size: "sm", mt: 2 }}
							profile={profile}
						/>
					)}
				</Flex>
			</Flex>
		</Center>
	);
};

export default observer(ProfileCard);
