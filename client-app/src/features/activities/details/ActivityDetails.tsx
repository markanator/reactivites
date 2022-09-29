import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "~/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";
import ScreenLoading from "~/app/components/ScreenLoading";

const ActivityDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { activityStore } = useStoreContext();
  const { selectedActivity, loadActivityFromId, isLoadingInitial } =
    activityStore;

  useEffect(() => {
    if (id) {
      loadActivityFromId(id);
    }
  }, [id, loadActivityFromId]);

  if (isLoadingInitial || !selectedActivity) return <ScreenLoading />;
  return (
    <Flex flexDir="column" h="full">
      <ActivityDetailedHeader activity={selectedActivity} />
      <Container maxW={"8xl"} pt={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <ActivityDetailedInfo activity={selectedActivity} />
            <ActivityDetailedChat />
          </GridItem>
          <GridItem>
            <ActivityDetailedSideBar />
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
};

export default observer(ActivityDetails);
