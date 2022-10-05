import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import CalendarDate from "~/components/CalendarDate";
import { Activity } from "~/types";
import ListItemAttendee from "./ListItemAttendee";

type Props = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: Props) => {
  const { category, city, date, id, title, venue, attendees } = activity;

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
        <HStack pos="relative">
          <Avatar
            name={activity?.hostUsername}
            src={activity.host?.image ?? "/assets/user.png"}
          />
          <Flex flexDir="column" alignItems="start">
            <Text mb={0}>
              <Link to={`/profiles/${activity.hostUsername}`}>
                <strong>{activity.host?.displayName}</strong>
              </Link>{" "}
              {activity.isCancelled ? "cancelled" : "shared"} a{" "}
              <Box as="span" textTransform="capitalize">
                {category}
              </Box>{" "}
              Event
            </Text>
            <HStack pt={1}>
              {activity.isCancelled && (
                <Badge colorScheme="red">Activity Cancelled</Badge>
              )}
              {activity.isHost && <Badge colorScheme="purple">Hosting</Badge>}
              {activity.isGoing && !activity.isHost && (
                <Badge colorScheme="green">Attending</Badge>
              )}
              {!activity.isGoing && !activity.isHost && (
                <Badge colorScheme="yellow">Not Attending</Badge>
              )}
            </HStack>
          </Flex>
        </HStack>
        <Box>...</Box>
      </Flex>
      {/* IMAGE */}
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
          <CalendarDate date={date!} />
          <Flex flexDir="column" w="full">
            <Heading
              as={Link}
              to={`${id}`}
              _hover={{
                textDecoration: "underline",
              }}
              w="fit-content"
              fontSize="1rem"
              mb={1}
              textTransform="capitalize"
            >
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
        <Button colorScheme="teal" as={Link} to={`${id}`}>
          View
        </Button>
      </Flex>
      {attendees && (
        <Flex
          px={4}
          pb={4}
          flexDir="column"
          overflow="hidden"
          justifyContent="space-between"
          alignItems="start"
          bgColor={useColorModeValue("white", "gray.700")}
          roundedBottom="lg"
        >
          <Heading as="p" fontSize="md" mb={2}>
            Attendees
          </Heading>
          <ListItemAttendee attendees={attendees} />
        </Flex>
      )}
    </Box>
  );
};

export default observer(ActivityListItem);
