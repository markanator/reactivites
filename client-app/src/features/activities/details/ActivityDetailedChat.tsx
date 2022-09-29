import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

type Props = {};

const ActivityDetailedChat = (props: Props) => {
  return (
    <Flex
      flexDir="column"
      p={4}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"sm"}
    >
      <Heading
        as="h4"
        fontSize="2xl"
        mb={8}
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
        Comments
      </Heading>
      <Flex flexDir="column" alignItems="flex-start">
        {/* AUTH REQUIRED */}
        <Text mb={8}>
          You must be{" "}
          <Link textColor="blue.500" fontWeight={500}>
            logged in
          </Link>{" "}
          to post a comment.
        </Text>
        <Flex flexDir="column" w="full">
          {/* SINGLE COMMENT */}
          <Flex w="full" pos="relative" pt={1} mt={1}>
            <Avatar src="/assets/user.png" />
            <Flex flexDir="column" ml={4}>
              <Flex alignItems="center">
                <Text fontWeight={700}>Matt</Text>
                <Text ml={2} fontSize="xs" textColor="gray.500">
                  Today at 5:42PM
                </Text>
              </Flex>
              <Text>How artistic!</Text>
              <Flex>
                <Button variant="link" size="xs">
                  Reply
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Box w="full" mt={6}>
            <HStack as="form" alignItems="start">
              <Textarea
                name="comment"
                placeholder="Leave a comment or reply..."
              ></Textarea>
              <Button colorScheme="teal" size="md">
                Add Reply
              </Button>
            </HStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(ActivityDetailedChat);
