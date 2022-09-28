import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import {
  useCreateActivity,
  useDeleteActivity,
  useEditActivity,
  useGetAllActivities,
} from "src/async/rq/activities";
import ActivityDashboard from "~/features/activities/dashboard/ActivityDashboard";
import type { Activity } from "./models/activity";
import Navbar from "./Layouts/Navbar";
import ScreenLoading from "./Layouts/ScreenLoading";
import { useStoreContext } from "~/stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStoreContext();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.isLoadingInitial) {
    return <ScreenLoading />;
  }

  return (
    <>
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container maxW={"8xl"} pt={4}>
          <ActivityDashboard />
        </Container>
      </Box>
    </>
  );
}

export default observer(App);
