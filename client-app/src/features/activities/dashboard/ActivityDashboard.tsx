import { Container, GridItem, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ScreenLoading from "~/components/ScreenLoading";
import { useStoreContext } from "~/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
	const { activityStore } = useStoreContext();
	const { loadActivities, isLoadingInitial, activityRegistry } = activityStore;

	useEffect(() => {
		if (activityRegistry.size <= 1) {
			loadActivities();
		}
	}, [activityRegistry.size, loadActivities]);

	if (isLoadingInitial) {
		return <ScreenLoading content="Loading activities..." />;
	}

	return (
		<Container maxW={"8xl"} pt={4}>
			<SimpleGrid
				display={{
					base: "flex",
					md: "grid",
				}}
				flexDir={{
					base: "column",
				}}
				columns={{
					md: 3,
				}}
				spacing={{
					md: 6,
				}}
				pt={12}
			>
				<GridItem
					order={2}
					colSpan={{
						md: 2,
					}}
					mb={8}
				>
					<ActivityList />
				</GridItem>
				<GridItem
					order={[1, 1, 2]}
					colSpan={{
						md: 1,
					}}
				>
					<ActivityFilters />
				</GridItem>
			</SimpleGrid>
		</Container>
	);
};

export default observer(ActivityDashboard);
