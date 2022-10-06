import { ListItem, Avatar, Flex, Badge, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "~/types";

export const AttendeeListItem = observer(
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
      <Avatar
        src={attendee?.image || "/assets/user.png"}
        name={attendee.displayName}
      />
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
        {attendee.following && (
          <Text
            mt={-1}
            fontSize="sm"
            fontWeight={500}
            letterSpacing="wide"
            textColor="orange"
          >
            Following
          </Text>
        )}
      </Flex>
    </ListItem>
  )
);
