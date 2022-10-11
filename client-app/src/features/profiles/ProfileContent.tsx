import {
	GridItem,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStoreContext } from "~/stores/store";
import { Profile } from "~/types";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

type Props = {
	profile: Profile;
};

const ProfileContent = ({ profile }: Props) => {
	const { profileStore } = useStoreContext();
	return (
		<GridItem colSpan={2}>
			<Tabs
				isLazy
				mt={6}
				onChange={(idx) => profileStore.setActiveTab(idx)}
				orientation="vertical"
				variant="solid-rounded"
				colorScheme="twitter"
			>
				<TabPanels
					mr={6}
					bgColor={useColorModeValue("gray.100", "gray.700")}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<TabPanel>
						<ProfileAbout />
					</TabPanel>
					<TabPanel w="full">
						<ProfilePhotos profile={profile} />
					</TabPanel>
					<TabPanel>
						<ProfileActivities />
					</TabPanel>
					<TabPanel>
						<ProfileFollowings />
					</TabPanel>
					<TabPanel>
						<ProfileFollowings />
					</TabPanel>
				</TabPanels>
				<TabList>
					<Tab>About</Tab>
					<Tab>Photos</Tab>
					<Tab>Events</Tab>
					<Tab>Followers</Tab>
					<Tab>Following</Tab>
				</TabList>
			</Tabs>
		</GridItem>
	);
};

export default observer(ProfileContent);
