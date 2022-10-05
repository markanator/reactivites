import {
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "~/types";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";

type Props = {
  profile: Profile;
};

const ProfileContent = ({ profile }: Props) => {
  return (
    <GridItem colSpan={2}>
      <Tabs
        isLazy
        mt={6}
        orientation="vertical"
        variant="solid-rounded"
        colorScheme="twitter"
      >
        <TabPanels
          mr={6}
          bgColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius="lg"
          boxShadow="md"
          w="full"
        >
          <TabPanel>
            <ProfileAbout />
          </TabPanel>
          <TabPanel w="full">
            <ProfilePhotos profile={profile} />
          </TabPanel>
          <TabPanel>
            <p>3!</p>
          </TabPanel>
          <TabPanel>
            <p>4!</p>
          </TabPanel>
          <TabPanel>
            <p>5!</p>
          </TabPanel>
        </TabPanels>
        <TabList>
          <Tab>About</Tab>
          <Tab>Photos</Tab>
          <Tab>Events</Tab>
          <Tab>Followers</Tab>
          <Tab>Following</Tab>
        </TabList>
      </Tabs>
    </GridItem>
  );
};

export default observer(ProfileContent);
