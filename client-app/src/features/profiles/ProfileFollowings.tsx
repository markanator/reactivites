import { Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStoreContext } from "~/stores/store";
import ProfileCard from "./ProfileCard";

const ProfileFollowings = () => {
	const { profileStore } = useStoreContext();
	const { profile, followings, loadFollowings, isLoadingFollowings, activeTab } = profileStore;
	useEffect(() => {
		loadFollowings("following");
	}, [loadFollowings]);

	return (
		<VStack spacing={6} alignItems="start" w="full">
			<Flex justifyContent="space-between" w="full">
				<Heading fontSize={"2xl"} textTransform="capitalize">
					{activeTab === 3
						? `People Following ${profile?.displayName}`
						: `People ${profile?.displayName} Follows`}
				</Heading>
			</Flex>
			<Flex w="full" flexWrap="wrap" alignItems="flex-start">
				{isLoadingFollowings && <Spinner size="lg" />}
				{!isLoadingFollowings &&
					followings?.map((profile) => (
						<Flex key={profile.username} flex="0 0 25%" h="full" maxH="180px">
							<ProfileCard profile={profile} showFollowButtons={true} />
						</Flex>
					))}
			</Flex>
		</VStack>
	);
};

export default observer(ProfileFollowings);
