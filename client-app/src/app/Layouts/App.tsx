import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
  useCreateActivity,
  useDeleteActivity,
  useEditActivity,
  useGetAllActivities,
} from "~/async/rq/activities";
import ActivityDashboard from "~/features/activities/dashboard/ActivityDashboard";
import type { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ScreenLoading from "./ScreenLoading";

function App() {
  const { data: activities, isLoading, error } = useGetAllActivities();
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync: createActivityAsync } = useCreateActivity();
  const { mutateAsync: editActivityAsync } = useEditActivity();
  const { mutateAsync: deleteActivityAsync } = useDeleteActivity();

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

  const handleCreateOrEditActivity = async (mutatedActivity: Activity) => {
    try {
      setSubmitting(true);
      const promiseReq = !!mutatedActivity.id ? editActivityAsync : createActivityAsync;
      await promiseReq({ ...mutatedActivity, id: !!mutatedActivity?.id ? mutatedActivity?.id : uuid() });
      setSelectedActivity(mutatedActivity);
      setIsEditing(false);
      setSubmitting(false);
    } catch (error: any) {
      console.warn(error?.message);
      setSubmitting(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      setSubmitting(true);
      await deleteActivityAsync(id);
      setSubmitting(false);
    } catch (error: any) {
      console.warn(error?.message);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <ScreenLoading />;
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
            submitting={submitting}
          />
        </Container>
      </Box>
    </>
  );
}

export default App;
