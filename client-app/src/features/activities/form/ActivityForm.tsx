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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuid } from "uuid";
import { Activity } from "../../../app/models/activity";

const ActivityFormSchema = yup
  .object({
    id: yup.string().optional(),
    title: yup.string().required(),
    date: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    city: yup.string().required(),
    venue: yup.string().required(),
  })
  .required();

type IFormData = Omit<Activity, "id">;

type Props = {
  selectedActivity?: Activity;
  handleCloseEditForm: () => void;
  handleCreateOrEditActivity: (mutatedActivity: Activity) => void;
};

const ActivityForm = ({ selectedActivity, handleCloseEditForm, handleCreateOrEditActivity }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(ActivityFormSchema),
    defaultValues: selectedActivity ? selectedActivity : {},
  });
  const onSubmit = (data: IFormData) => {
    const activity = { ...data, id: selectedActivity?.id ?? uuid() };
    handleCreateOrEditActivity(activity);
    console.log({ activity });
  };
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
    >
      <Flex as="form" onSubmit={handleSubmit(onSubmit)} p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>{selectedActivity ? "Edit" : "Create"} an Activity</Heading>
          <FormControl id="title" isInvalid={!!errors?.title?.message}>
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
              {...register("title")}
            />
          </FormControl>
          <FormControl id="description" isInvalid={!!errors?.title?.message}>
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
              {...register("description")}
            />
          </FormControl>
          <FormControl id="category" isInvalid={!!errors?.title?.message}>
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
              {...register("category")}
            />
          </FormControl>
          <FormControl id="date" isInvalid={!!errors?.title?.message}>
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
              type="date"
              {...register("date")}
            />
          </FormControl>
          <FormControl id="city" isInvalid={!!errors?.title?.message}>
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
              {...register("city")}
            />
          </FormControl>
          <FormControl id="venue" isInvalid={!!errors?.title?.message}>
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
              {...register("venue")}
            />
          </FormControl>

          <Stack direction={"row"} justifyContent="center" spacing={6}>
            <Button colorScheme={"gray"} variant={"solid"} onClick={handleCloseEditForm}>
              Cancel
            </Button>
            <Button type="submit" colorScheme={"blue"} variant={"solid"}>
              {selectedActivity ? "Edit" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ActivityForm;
