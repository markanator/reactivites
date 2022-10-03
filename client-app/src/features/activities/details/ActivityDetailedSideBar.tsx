import {
  Avatar,
  Badge,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Activity, Profile } from "~/types";

type Props = {
  activity: Activity;
};

const ActivityDetailedSideBar = ({ activity }: Props) => {
  const { attendees, host, hostUsername } = activity;
  return (
    <Flex
      flexDir="column"
      p={4}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"sm"}
    >
      <Flex mb={8} alignItems="center">
        <Heading
          as="h4"
          fontSize="2xl"
          display="block"
          pos="relative"
          _after={{
            position: "absolute",
            bottom: "-15px",
            left: "0px",
            content: '""',
            width: "30px",
            height: "1px",
            backgroundColor: "#e86c60",
          }}
        >
          Attendees
        </Heading>
        <Text pl={3} fontSize="sm" fontWeight="600">
          ({attendees?.length || 0}){" "}
          {attendees?.length === 1 ? "Person" : "People"} going
        </Text>
      </Flex>
      <UnorderedList listStyleType="none">
        {attendees?.map((attendee) => (
          <AttendeeListItem
            key={attendee.username}
            attendee={attendee}
            hostUsername={hostUsername}
          />
        ))}
      </UnorderedList>
    </Flex>
  );
};

const AttendeeListItem = React.memo(
  ({
    attendee,
    hostUsername,
  }: {
    attendee: Profile;
    hostUsername?: string;
  }) => (
    <ListItem
      key={attendee.username}
      display="flex"
      justifyContent="center"
      alignItems="start"
      borderBottom="1px solid"
      borderColor="gray.300"
      _last={{
        border: "none",
      }}
      _first={{
        paddingTop: "0px",
      }}
      py={2}
    >
      <Avatar />
      <Flex flexDir="column" ml={4} w="full">
        <Flex alignItems="center" justifyContent="space-between">
          <Link to={`/profiles/${attendee.username}`}>
            <Text m={0} p={0} fontSize="lg" fontWeight={700}>
              {attendee?.displayName}
            </Text>
          </Link>
          {hostUsername && hostUsername === attendee.username && (
            <Badge variant="subtle" colorScheme="green">
              Host
            </Badge>
          )}
        </Flex>
        <Text
          mt={-1}
          fontSize="sm"
          fontWeight={500}
          letterSpacing="wide"
          textColor="orange"
        >
          Following
        </Text>
      </Flex>
    </ListItem>
  )
);

export default ActivityDetailedSideBar;
