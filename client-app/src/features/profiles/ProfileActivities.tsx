import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Box,
	Image,
	VStack,
	Heading,
	Flex,
	ListItem,
	List,
	useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import { UserActivity } from "~/types";

const panes = ["future", "past", "hosting"];

const ProfileActivities = () => {
	const { profileStore } = useStoreContext();
	const { loadUserActivities, profile, isLoadingActivities, userActivities } = profileStore;
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		loadUserActivities(profile!.username, panes[index]);
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		loadUserActivities(profile!.username);
	}, [loadUserActivities, profile]);

	return (
		<Tabs index={tabIndex} onChange={handleTabsChange} isLazy>
			<TabList>
				<Tab isDisabled={isLoadingActivities}>Future Events</Tab>
				<Tab isDisabled={isLoadingActivities}>Past Events</Tab>
				<Tab isDisabled={isLoadingActivities}>Hosting</Tab>
			</TabList>
			<TabPanels>
				<Panel key="FutureEvents" userActivities={userActivities} />
				<Panel key="PastEvents" userActivities={userActivities} />
				<Panel key="HostingEvents" userActivities={userActivities} />
			</TabPanels>
		</Tabs>
	);
};

const Panel = ({ userActivities }: { userActivities: UserActivity[] }) => {
	const cardBgColor = useColorModeValue("gray.200", "gray.600");

	return (
		<TabPanel>
			<List display="flex" flexWrap="wrap" gap={4}>
				{userActivities.map((activity) => {
					return (
						<ListItem
							shadow="lg"
							key={activity.id}
							bgColor={cardBgColor}
							flex="0 0 22%"
							borderRadius="md"
							overflow="hidden"
						>
							<Flex
								as={Link}
								to={`/activities/${activity.id}`}
								flexDir="column"
								alignItems="center"
								justifyContent="center"
							>
								<Image
									src={`/assets/categoryImages/${activity.category}.jpg`}
									style={{ minHeight: 100, objectFit: "cover" }}
									w="auto"
									h={150}
									mb={2}
									alt={activity.title}
								/>
								<VStack mb={3}>
									<Heading fontSize="xl">{activity.title}</Heading>
									<VStack>
										<div>{dayjs(activity.date).format("MMMM D, YYYY")}</div>
										<div>{dayjs(activity.date).format("h:mm A")}</div>
									</VStack>
								</VStack>
							</Flex>
						</ListItem>
					);
				})}
			</List>
		</TabPanel>
	);
};

// Panel.displayName = "UserActivitiesPanel";

export default observer(ProfileActivities);
