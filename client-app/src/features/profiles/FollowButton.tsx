import { HStack, Button, ButtonProps, StackProps } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStoreContext } from "~/stores/store";
import { Profile } from "~/types";

type Props = {
	profile: Profile;
	unfollowProps?: ButtonProps;
	followProps?: ButtonProps;
	stackProps?: StackProps;
};

const FollowButton = ({ profile, followProps, unfollowProps, stackProps }: Props) => {
	const { profileStore, userStore } = useStoreContext();
	const { updateFollowing, isLoading } = profileStore;
	if (userStore?.user?.username === profile.username) return null;
	const handleFollow = (e: React.SyntheticEvent, username: string) => {
		e.preventDefault();
		updateFollowing(username, !profile.following);
	};
	return (
		<HStack spacing={4} w="full" {...stackProps}>
			{profile?.following ? (
				<Button
					w="full"
					colorScheme={"red"}
					isLoading={isLoading}
					onClick={(e) => handleFollow(e, profile.username)}
					{...unfollowProps}
				>
					Unfollow
				</Button>
			) : (
				<Button
					w="full"
					colorScheme={"green"}
					isLoading={isLoading}
					onClick={(e) => handleFollow(e, profile.username)}
					{...followProps}
				>
					Follow
				</Button>
			)}
		</HStack>
	);
};

export default observer(FollowButton);
