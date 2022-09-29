import {
  Avatar,
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

type Props = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: Props) => {
  const { category, city, date, id, title, venue } = activity;

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
        <Button colorScheme="teal" as={Link} to={`${id}`}>
          View
        </Button>
      </Flex>
    </Box>
  );
};

export default observer(ActivityListItem);
