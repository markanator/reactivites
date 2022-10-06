import { Heading, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useStoreContext } from "~/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
	const { activityStore } = useStoreContext();
	const { groupedActivities } = activityStore;

	return (
		<>
			<Stack spacing={8} mx={"auto"}>
				{groupedActivities.map(([group, list]) => (
					<Fragment key={group}>
						<Heading fontSize="2xl">{group}</Heading>
						<Stack spacing={8} mx={"auto"}>
							{list?.map((act) => (
								<ActivityListItem activity={act} key={act.id} />
							))}
						</Stack>
					</Fragment>
				))}
			</Stack>
		</>
	);
};

export default observer(ActivityList);
