import { Box, Container, ListItem, UnorderedList, useColorModeValue } from "@chakra-ui/react";
import { useGetAllActivities } from "../../../async/rq/activities";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./Navbar";
import { useState } from "react";
import { Activity } from "../models/activity";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const qc = useQueryClient();
  const { data: activities, isLoading, error } = useGetAllActivities();
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities?.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenEditForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  const handleCreateOrEditActivity = (mutatedActivity: Activity) => {
    setIsEditing(false);
    setSelectedActivity(mutatedActivity);
  };

  const handleDeleteActivity = (id: string) => {
    // TODO: do this
    console.log("TODO :: DELETE ACTIVITY:: %s", id);
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  if (error || !activities) {
    return <>An error occured!</>;
  }

  return (
    <>
      <Navbar handleOpenForm={handleOpenEditForm} />
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container maxW={"8xl"} pt={4}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectActivity={handleSelectActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            isEditing={isEditing}
            handleOpenEditForm={handleOpenEditForm}
            handleCloseEditForm={handleCloseEditForm}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            handleDeleteActivity={handleDeleteActivity}
          />
        </Container>
      </Box>
    </>
  );
}

export default App;
