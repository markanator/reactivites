import { Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ScreenLoading from "~/components/ScreenLoading";
import { useStoreContext } from "~/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

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
    <Flex flexDir="column" h="full" pb={20}>
      <ActivityDetailedHeader activity={selectedActivity} />
      <Container maxW={"8xl"} pt={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <ActivityDetailedInfo activity={selectedActivity} />
            <ActivityDetailedChat activityId={selectedActivity.id} />
          </GridItem>
          <GridItem>
            <ActivityDetailedSideBar activity={selectedActivity} />
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
};

export default observer(ActivityDetails);
