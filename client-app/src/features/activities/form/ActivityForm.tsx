import { Box, Button, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ScreenLoading from "~/components/ScreenLoading";
import InputField from "~/components/forms/Input";
import InputDate from "~/components/forms/InputDate";
import InputSelect from "~/components/forms/InputSelect";
import InputTextArea from "~/components/forms/InputTextArea";
import { useStoreContext } from "~/stores/store";
import { ActivityFormSchema, categoryOptions } from "./form.helpers";
import { ActivityFormValues } from "~/lib/ActivityFormValues";

const ActivityForm = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
	const { id } = useParams();
	const { activityStore } = useStoreContext();
	const { createActivity, updateActivity, loadActivityFromId, isLoadingInitial } = activityStore;
	const isEditing = useMemo(() => pathname?.includes("manage"), [pathname]);

	const onSubmit = async (values: ActivityFormValues) => {
		let idToNavigateTo: string;
		if (isEditing && activity?.id) {
			idToNavigateTo = activity.id;
			updateActivity(values);
		} else {
			idToNavigateTo = uuid();
			const newAct = { ...values, id: idToNavigateTo };
			await createActivity(newAct);
		}
		navigate(`/activities/${idToNavigateTo}`);
	};

	useEffect(() => {
		if (id) {
			loadActivityFromId(id).then((payload) => setActivity(new ActivityFormValues(payload)));
		}
	}, [id, loadActivityFromId]);

	const boxBgColor = useColorModeValue("white", "gray.900");

	if (isLoadingInitial) return <ScreenLoading />;

	return (
		<Box
			my={20}
			mx="auto"
			maxW={"600px"}
			w={"full"}
			bg={boxBgColor}
			boxShadow={"2xl"}
			rounded={"md"}
			p={6}
			overflow={"hidden"}
			position="relative"
		>
			<Formik
				enableReinitialize
				initialValues={activity}
				validationSchema={ActivityFormSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting, dirty, isValid }: FormikProps<ActivityFormValues>) => (
					<Form>
						<Flex p={8} flex={1} align={"center"} justify={"center"}>
							<Stack spacing={4} w={"full"} maxW={"md"}>
								<Heading fontSize={"2xl"}>{isEditing ? "Edit" : "Create"} an Activity</Heading>
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
										as={Link}
										to={isEditing ? `/activities/${activity?.id}` : "/activities"}
										isLoading={isLoadingInitial || isSubmitting}
										colorScheme={"gray"}
										variant={"solid"}
									>
										Cancel
									</Button>
									<Button
										isLoading={isLoadingInitial || isSubmitting}
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
