import { Container, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ScreenLoading from "~/components/ScreenLoading";
import { useStoreContext } from "~/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
	const { username } = useParams<{ username: string }>();
	const { profileStore } = useStoreContext();
	const { isLoadingProfile, profile, loadProfile } = profileStore;

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		loadProfile(username!);
	}, [loadProfile, username]);

	if (isLoadingProfile) return <ScreenLoading content="Loading profile..." />;

	return (
		<Container mx="auto" my={20} maxW="7xl">
			<Grid templateRows="min-content max-content" templateColumns="repeat(2, 1fr)">
				{profile && (
					<>
						<ProfileHeader profile={profile} />
						<ProfileContent profile={profile} />
					</>
				)}
			</Grid>
		</Container>
	);
};

export default observer(ProfilePage);
