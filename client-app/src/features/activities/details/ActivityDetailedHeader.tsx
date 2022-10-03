import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MapPinIcon, ClockIcon, TagIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import CalendarDate from "~/components/CalendarDate";
import { Activity } from "~/types";

type Props = {
  activity: Activity;
};

const ActivityDetailedHeader = ({ activity }: Props) => {
  return (
    <Flex flexDir="column" w="full" bgColor="gray.100">
      <Box
        backgroundImage={`url("/assets/categoryImages/${activity.category}.jpg")`}
        backgroundSize="cover"
        backgroundPosition="bottom"
        height="400px"
      ></Box>
      <Container maxW={"8xl"} pt={4}>
        <Flex justifyContent="space-between" alignItems="center" py={6}>
          <Flex w="full">
            <CalendarDate date={activity.date} />
            <Flex flexDir="column" w="full">
              <Heading
                as="h5"
                fontSize="3xl"
                mb={2}
                mt={-1}
                textTransform="capitalize"
              >
                {activity.title}
              </Heading>
              <Flex flexDir="row" alignItems="center">
                <Flex alignItems="center">
                  <TagIcon width={16} height={16} />
                  <Text ml={1} textTransform="capitalize">
                    {activity.category}
                  </Text>
                </Flex>
                <Flex alignItems="center" ml={4}>
                  <MapPinIcon width={16} height={16} />
                  <Text ml={1} textTransform="capitalize">
                    {activity.city + ", " + activity.venue}
                  </Text>
                </Flex>
                <Flex alignItems="center" ml={4}>
                  <ClockIcon width={16} height={16} />
                  <Text ml={1} textTransform="capitalize">
                    {dayjs(activity.date).format("ddd, MMMM D, YYYY (h:mm A)")}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <VStack>
            {!activity?.isHost && activity?.isGoing && (
              <Button w="full" colorScheme="yellow" size="lg">
                Cancel Attendance
              </Button>
            )}
            {!activity?.isHost && !activity?.isGoing && (
              <Button colorScheme="teal" size="lg">
                Register to Attend
              </Button>
            )}
            {activity?.isHost && (
              <Button
                w="full"
                colorScheme="orange"
                size="md"
                as={Link}
                to={`/activities/${activity.id}/manage`}
              >
                Manage Event
              </Button>
            )}
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default observer(ActivityDetailedHeader);
