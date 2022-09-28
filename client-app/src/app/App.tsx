import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ActivityDashboard from "~/features/activities/dashboard/ActivityDashboard";
import { useStoreContext } from "~/stores/store";
import Navbar from "./Layouts/Navbar";
import ScreenLoading from "./Layouts/ScreenLoading";

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
