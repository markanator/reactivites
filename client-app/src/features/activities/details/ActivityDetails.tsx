import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "~/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ActivityDetails = () => {
  const navigate = useNavigate();
  let { id } = useParams<{ id: string }>();
  const { activityStore } = useStoreContext();
  const { selectedActivity, loadActivityFromId, isLoadingInitial } =
    activityStore;

  useEffect(() => {
    if (id) {
      loadActivityFromId(id);
    }
  }, [id, loadActivityFromId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoadingInitial || !selectedActivity) return <div>Loading...</div>;
  return (
    <>
      <Box
        // maxW={"600px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        position="relative"
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image
            src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
            h={600}
            w="full"
            objectFit="cover"
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {selectedActivity.category}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {selectedActivity.title}
          </Heading>
          <Text color={"gray.500"}>{selectedActivity.description}</Text>
        </Stack>
        <HStack mt={6} justifyContent={"space-between"} alignItems="center">
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/16071902?v=4"}
              size="md"
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
          <HStack alignItems="center" justifyContent={"center"}>
            <Button colorScheme={"blue"} as={Link} to="edit">
              Edit
            </Button>
            <Button colorScheme={"gray"} onClick={handleGoBack}>
              cancel
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default observer(ActivityDetails);
