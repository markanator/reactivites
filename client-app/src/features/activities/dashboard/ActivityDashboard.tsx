import { GridItem, ListItem, SimpleGrid, UnorderedList } from "@chakra-ui/react";
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
  isEditing: boolean;
  handleOpenEditForm: (id: string) => void;
  handleCloseEditForm: () => void;
  handleCreateOrEditActivity: (mutatedActivity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
};

const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectActivity,
  handleCancelSelectActivity,
  isEditing,
  handleOpenEditForm,
  handleCloseEditForm,
  handleCreateOrEditActivity,
  handleDeleteActivity,
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
          handleDeleteActivity={handleDeleteActivity}
        />
      </GridItem>
      <GridItem
        colSpan={{
          md: 1,
        }}
      >
        {selectedActivity && !isEditing && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            handleOpenEditForm={handleOpenEditForm}
          />
        )}
        {isEditing && (
          <ActivityForm
            selectedActivity={selectedActivity}
            handleCloseEditForm={handleCloseEditForm}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
          />
        )}
      </GridItem>
    </SimpleGrid>
  );
};

export default ActivityDashboard;
