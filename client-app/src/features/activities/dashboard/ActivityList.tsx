import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Activity } from "../../../app/models/activity";

type Props = {
  activities: Activity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};

const ActivityList = ({ activities, handleSelectActivity, handleDeleteActivity }: Props) => {
  return (
    <>
      <Stack spacing={8} mx={"auto"}>
        {activities?.map(({ category, city, date, description, id, title, venue }) => (
          <Box key={id} rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={6}>
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
                  colorScheme={"red"}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteActivity(id)}
                >
                  Delete
                </Button>
                <Button colorScheme={"blue"} size="sm" onClick={() => handleSelectActivity(id)}>
                  View
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ActivityList;
