import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ScreenLoading from "~/app/components/ScreenLoading";
import InputField from "~/components/forms/Input";
import InputDate from "~/components/forms/InputDate";
import InputSelect from "~/components/forms/InputSelect";
import InputTextArea from "~/components/forms/InputTextArea";
import { useStoreContext } from "~/stores/store";
import { Activity } from "~/types";
import {
  ActivityFormSchema,
  categoryOptions,
  initialState,
} from "./form.helpers";

const ActivityForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let { id } = useParams();
  const { activityStore } = useStoreContext();
  const {
    selectedActivity,
    createActivity,
    updateActivity,
    clearSelectedActivity,
    loadActivityFromId,
    isLoadingInitial,
  } = activityStore;
  const isEditing = useMemo(() => pathname?.includes("manage"), [pathname]);

  const onSubmit = async (values: Activity) => {
    // console.log({ isEditing, ...values, id: id ?? "" });
    if (isEditing && selectedActivity?.id) {
      updateActivity({ ...values, id: selectedActivity?.id });
      navigate(`/activities/${selectedActivity?.id}`);
    } else {
      const newAct = { ...values, id: uuid() };
      await createActivity(newAct);
      navigate(`/activities/${newAct.id}`);
    }
  };

  useEffect(() => {
    if (!!id) {
      loadActivityFromId(id);
    } else {
      clearSelectedActivity();
    }
  }, [id, loadActivityFromId]);

  if (isLoadingInitial) return <ScreenLoading />;

  return (
    <Box
      my={20}
      mx="auto"
      maxW={"600px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      position="relative"
    >
      <Formik
        enableReinitialize
        initialValues={selectedActivity ?? initialState}
        validationSchema={ActivityFormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, dirty, isValid }: FormikProps<Activity>) => (
          <Form>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"2xl"}>
                  {isEditing ? "Edit" : "Create"} an Activity
                </Heading>
                <InputField name="title" />
                <InputTextArea name="description" />
                <InputSelect name="category" options={categoryOptions} />
                <InputDate
                  name="date"
                  showTimeSelect
                  timeCaption="time"
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                />
                <InputField name="city" />
                <InputField name="venue" />
                <Stack direction={"row"} justifyContent="center" spacing={6}>
                  <Button
                    isLoading={isLoadingInitial}
                    colorScheme={"gray"}
                    variant={"solid"}
                    as={Link}
                    to={
                      isEditing
                        ? `/activities/${selectedActivity?.id}`
                        : "/activities"
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={isLoadingInitial}
                    disabled={isSubmitting || !dirty || !isValid}
                    type="submit"
                    colorScheme={"blue"}
                    variant={"solid"}
                  >
                    {isEditing ? "Edit" : "Submit"}
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default observer(ActivityForm);
