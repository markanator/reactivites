import {
  Box,
  Container,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetAllActivities } from "../../../async/rq/activities";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./Navbar";
import { useState } from "react";
import { Activity } from "../models/activity";

function App() {
  const { data, isLoading, error } = useGetAllActivities();
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(data?.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  if (error || !data) {
    return <>An error occured!</>;
  }

  return (
    <>
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container maxW={"8xl"} pt={4}>
          <ActivityDashboard
            activities={data}
            selectedActivity={selectedActivity}
            handleSelectActivity={handleSelectActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
          />
        </Container>
      </Box>
    </>
  );
}

export default App;
