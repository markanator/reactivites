import {
  useColorModeValue,
  Box,
  Text,
  Heading,
  HStack,
  Tag,
  Button,
  VStack,
  Flex,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CalendarDate from "~/components/CalendarDate";
import { Activity } from "~/types";
import { useStoreContext } from "~/stores/store";
import { MapPinIcon } from "@heroicons/react/24/solid";

type Props = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: Props) => {
  const [target, setTarget] = useState("");
  const { activityStore } = useStoreContext();
  const { deleteActivity, isLoading } = activityStore;
  const { category, city, date, id, title, venue } = activity;

  const handleActivityDelete = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Box
      key={id}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
    >
      {/* USER INFO */}
      <Flex
        p={4}
        pb={3}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Avatar name="Angelina" />
          <Flex flexDir="column">
            <Text mb={0}>
              <strong>Angelina</strong> shared a{" "}
              <Box as="span" textTransform="capitalize">
                {category}
              </Box>{" "}
              Event
            </Text>
            <Text mb={0} fontSize="sm">
              Created Date
            </Text>
          </Flex>
        </HStack>
        <Box>...</Box>
      </Flex>
      <Image
        src={`/assets/categoryImages/${category}.jpg`}
        h={325}
        w="full"
        objectFit="cover"
      />
      <Flex
        p={4}
        overflow="hidden"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex w="full">
          <CalendarDate date={date} />
          <Flex flexDir="column" w="full">
            <Heading as="h5" fontSize="1rem" mb={1} textTransform="capitalize">
              {title}
            </Heading>
            <Flex flexDir="row" alignItems="center">
              <MapPinIcon width={16} height={16} />
              <Text ml={1} textTransform="capitalize">
                {city + ", " + venue}
              </Text>
            </Flex>
          </Flex>
        </Flex>
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
          <Button size="sm" as={Link} to={`${id}`}>
            View
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default observer(ActivityListItem);
