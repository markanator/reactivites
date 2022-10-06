import {
	Avatar,
	Button,
	Divider,
	Flex,
	GridItem,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Profile } from "~/types";

type Props = {
	profile: Profile;
};

const ProfileHeader = ({ profile }: Props) => {
	return (
		<GridItem colSpan={2}>
			<Flex
				bgColor={useColorModeValue("gray.100", "gray.700")}
				borderRadius="lg"
				boxShadow="md"
				p={8}
				w="full"
				justifyContent="space-between"
			>
				<Flex alignItems="center">
					<Avatar
						size="2xl"
						name={profile.displayName}
						src={profile?.image || "/assets/user.png"}
					/>
					<Heading ml={6}>{profile.displayName}</Heading>
				</Flex>
				<VStack>
					<HStack mb={2} spacing={8}>
						<StatBlock label="Followers" value={profile.followersCount} />
						<StatBlock label="Following" value={profile.followingCount} />
					</HStack>
					<Divider />
					<HStack spacing={4} w="full">
						<Button w="full" colorScheme={"green"}>
							Follow
						</Button>
						<Button w="full" colorScheme={"red"}>
							Unfollow
						</Button>
					</HStack>
				</VStack>
			</Flex>
		</GridItem>
	);
};

const StatBlock = ({ label, value }: { label: string; value: number }) => {
	return (
		<VStack>
			<Heading>{value}</Heading>
			<Text>{label}</Text>
		</VStack>
	);
};

export default observer(ProfileHeader);
