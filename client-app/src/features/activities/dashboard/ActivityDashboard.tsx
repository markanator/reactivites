import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ScreenLoading from "~/app/components/ScreenLoading";
import { useStoreContext } from "~/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStoreContext();
  const { loadActivities, selectedActivity, isEditing, isLoadingInitial } =
    activityStore;

  useEffect(() => {
    loadActivities();
  }, [activityStore]);

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
        md: 1,
      }}
      spacing={{
        md: 6,
      }}
      pt={12}
    >
      <GridItem
        colSpan={{
          md: 1,
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
        {selectedActivity && !isEditing && <ActivityDetails />}
        {isEditing && <ActivityForm />}
      </GridItem>
    </SimpleGrid>
  );
};

export default observer(ActivityDashboard);
