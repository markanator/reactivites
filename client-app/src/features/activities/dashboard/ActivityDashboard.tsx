import {
  GridItem,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

type Props = {
  activities: Activity[];
  selectedActivity?: Activity;
  handleSelectActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
};

const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectActivity,
  handleCancelSelectActivity,
}: Props) => {
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
      >
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
        />
      </GridItem>
      <GridItem
        colSpan={{
          md: 1,
        }}
      >
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
          />
        )}
        {selectedActivity && false && <ActivityForm />}
      </GridItem>
    </SimpleGrid>
  );
};

export default ActivityDashboard;
