import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreContext } from "~/stores/store";
import ProfileEditForm from "./ProfileEditForm";

type Props = {};

const ProfileAbout = (props: Props) => {
  const { profileStore } = useStoreContext();
  const { isCurrentUser, profile } = profileStore;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <VStack alignItems="start" w="full">
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize={"2xl"}>About {profile?.displayName}</Heading>
        {isCurrentUser && (
          <Button onClick={() => setIsEditMode((prev) => !prev)}>
            {isEditMode ? "Cancel" : "Edit Profile"}
          </Button>
        )}
      </Flex>
      <Flex w="full">
        {isEditMode ? (
          <ProfileEditForm setEditMode={setIsEditMode} />
        ) : (
          <Box whiteSpace="pre-wrap">{profile?.bio}</Box>
        )}
      </Flex>
    </VStack>
  );
};

export default observer(ProfileAbout);
