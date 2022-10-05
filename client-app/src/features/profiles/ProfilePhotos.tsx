import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useStoreContext } from "~/stores/store";
import { Photo, Profile } from "~/types";

type Props = {
  profile: Profile;
};

const ProfilePhotos = ({ profile }: Props) => {
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const { profileStore } = useStoreContext();
  const { isCurrentUser } = profileStore;
  return (
    <VStack alignItems="start" w="full">
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize={"2xl"}>Photos</Heading>
        {isCurrentUser && (
          <Button onClick={() => setAddPhotoMode((prev) => !prev)}>
            {addPhotoMode ? "Cancel" : "Upload Photo"}
          </Button>
        )}
      </Flex>
      <Flex flexWrap="wrap" gap={4}>
        {addPhotoMode ? (
          <p>Photo Widget goes here</p>
        ) : (
          <>
            {profile?.photos?.map((photo) => (
              <ImageCard key={photo.id} photo={photo} />
            ))}
          </>
        )}
      </Flex>
    </VStack>
  );
};

const ImageCard = ({ photo }: { photo?: Photo }) => {
  return (
    <Box
      pos="relative"
      flex="0 0 250px"
      bgColor={useColorModeValue("gray.100", "gray.600")}
      p={4}
    >
      <Image src={photo?.url} w={350} />
      {photo?.isMain && (
        <Badge
          pos="absolute"
          top={4}
          left={4}
          variant="solid"
          colorScheme="blue"
        >
          Main
        </Badge>
      )}
    </Box>
  );
};

export default ProfilePhotos;
