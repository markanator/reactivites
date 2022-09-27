import { GridItem, SimpleGrid } from "@chakra-ui/react";
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
  submitting: boolean;
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
  submitting,
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
        mb={8}
      >
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
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
            submitting={submitting}
          />
        )}
      </GridItem>
    </SimpleGrid>
  );
};

export default ActivityDashboard;
