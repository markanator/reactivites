import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreContext } from "~/stores/store";

const ActivityList = () => {
  const [target, setTarget] = useState("");
  const { activityStore } = useStoreContext();
  const { activitiesByDate, deleteActivity, isLoading } = activityStore;

  const handleActivityDelete = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <>
      <Stack spacing={8} mx={"auto"}>
        {activitiesByDate?.map(
          ({ category, city, date, description, id, title, venue }) => (
            <Box
              key={id}
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={6}
            >
              <Heading fontSize="2xl">{title}</Heading>
              <Text mt={1} fontSize="sm" color={"gray.500"}>
                {new Date(date).toLocaleDateString()}
              </Text>
              <Text mt={2}>{description}</Text>
              <Text mt={1}>{city + ", " + venue}</Text>
              <HStack justifyContent={"space-between"} mt={4}>
                <Tag>{category}</Tag>
                <HStack spacing={4}>
                  <Button
                    name={id}
                    colorScheme={"red"}
                    variant="outline"
                    size="sm"
                    onClick={(evt) => handleActivityDelete(evt, id)}
                    isLoading={isLoading && target === id}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme={"blue"}
                    size="sm"
                    onClick={() => activityStore.setSelectedAcivity(id)}
                  >
                    View
                  </Button>
                </HStack>
              </HStack>
            </Box>
          )
        )}
      </Stack>
    </>
  );
};

export default observer(ActivityList);
