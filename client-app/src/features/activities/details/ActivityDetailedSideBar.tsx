import {
  Avatar,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const ActivityDetailedSideBar = (props: Props) => {
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
        Attendees
      </Heading>
      <UnorderedList listStyleType="none">
        <ListItem
          display="flex"
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
          <Flex flexDir="column" ml={4}>
            <Text m={0} p={0} fontSize="lg" fontWeight={700}>
              Matt
            </Text>
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
      </UnorderedList>
      {/* <Segment attached>
            <List relaxed divided>
                <Item style={{ position: 'relative' }}>
                    <Label
                        style={{ position: 'absolute' }}
                        color='orange'
                        ribbon='right'
                    >
                        Host
                    </Label>
                    <Image size='tiny' src={'/assets/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                            <Link to={`#`}>Bob</Link>
                        </Item.Header>
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                    </Item.Content>
                </Item>

                <Item style={{ position: 'relative' }}>
                    <Image size='tiny' src={'/assets/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                            <Link to={`#`}>Tom</Link>
                        </Item.Header>
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                    </Item.Content>
                </Item>

                <Item style={{ position: 'relative' }}>
                    <Image size='tiny' src={'/assets/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                            <Link to={`#`}>Sally</Link>
                        </Item.Header>
                    </Item.Content>
                </Item>
            </List>
        </Segment> */}
    </Flex>
  );
};

export default ActivityDetailedSideBar;
