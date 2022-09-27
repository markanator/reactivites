import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";

type Props = {};

const ActivityForm = (props: Props) => {
  return (
    <Box
      maxW={"600px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      position="relative"
      mt={8}
    >
      <Flex as="form" p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Edit an Activity</Heading>
          <FormControl id="title">
            <VisuallyHidden>
              <FormLabel>Title</FormLabel>
            </VisuallyHidden>
            <Input
              placeholder="Title"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>
          <FormControl id="description">
            <VisuallyHidden>
              <FormLabel>description</FormLabel>
            </VisuallyHidden>
            <Textarea
              placeholder="Description"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>
          <FormControl id="category">
            <VisuallyHidden>
              <FormLabel>category</FormLabel>
            </VisuallyHidden>
            <Input
              placeholder="Category"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>
          <FormControl id="date">
            <VisuallyHidden>
              <FormLabel>date</FormLabel>
            </VisuallyHidden>
            <Input
              placeholder="Date"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>
          <FormControl id="city">
            <VisuallyHidden>
              <FormLabel>City</FormLabel>
            </VisuallyHidden>
            <Input
              placeholder="City"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>
          <FormControl id="venue">
            <VisuallyHidden>
              <FormLabel>venue</FormLabel>
            </VisuallyHidden>
            <Input
              placeholder="Venue"
              bg={"gray.100"}
              border={0}
              color={"gray.700"}
              _placeholder={{
                color: "gray.600",
              }}
            />
          </FormControl>

          <Stack spacing={6}>
            {/* <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack> */}
            <Button colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ActivityForm;
