import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ScreenLoading from "~/app/components/ScreenLoading";
import { useStoreContext } from "~/stores/store";
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
    return <ScreenLoading />;
  }

  return (
    <SimpleGrid
      display={{
        base: "initial",
        md: "grid",
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
        colSpan={{
          md: 2,
        }}
        mb={8}
      >
        <ActivityList />
      </GridItem>
      <GridItem
        colSpan={{
          md: 1,
        }}
      >
        {/* FILTERING */}
      </GridItem>
    </SimpleGrid>
  );
};

export default observer(ActivityDashboard);
