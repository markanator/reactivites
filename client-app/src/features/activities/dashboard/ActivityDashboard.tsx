import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "~/stores/store";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStoreContext();
  const { selectedActivity, isEditing } = activityStore;

  return (
    <SimpleGrid
      display={{
        base: "initial",
        md: "grid",
      }}
      columns={{
        md: 2,
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
