import { Container, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { PaginationParams } from "~/lib/PaginationParams";
import { useStoreContext } from "~/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ListItemSkeleton from "./ListItemSkeleton";

const ActivityDashboard = () => {
	const [loadingNext, setLoadingNext] = useState(false);
	const { activityStore } = useStoreContext();
	const { loadActivities, isLoadingInitial, activityRegistry, setPagingParams, pagination } =
		activityStore;

	const handleGetNext = () => {
		setLoadingNext(true);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		setPagingParams(new PaginationParams(pagination!.currentPage + 1));
		loadActivities().then(() => setLoadingNext(false));
	};

	useEffect(() => {
		if (activityRegistry.size <= 1) {
			loadActivities();
		}
	}, [activityRegistry.size, loadActivities]);

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
					{isLoadingInitial && !loadingNext ? (
						<>
							<ListItemSkeleton />
							<ListItemSkeleton />
						</>
					) : (
						<>
							<InfiniteScroll
								pageStart={0}
								loadMore={handleGetNext}
								hasMore={
									!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages
								}
								initialLoad={false}
							>
								<ActivityList />
							</InfiniteScroll>
							{loadingNext && <Spinner size="lg" />}
						</>
					)}
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
