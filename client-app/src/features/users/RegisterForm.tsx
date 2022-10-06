import { Box, Button, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import InputField from "~/components/forms/Input";
import { useStoreContext } from "~/stores/store";
import ValidationErrors from "../errors/ValidationErrors";

const initialState = {
	displayName: "",
	username: "",
	email: "",
	password: "",
	error: null,
};

const registerSchema = yup.object({
	displayName: yup.string().required("Required."),
	username: yup.string().required("Required."),
	email: yup.string().email().required("Required."),
	password: yup.string().min(8).required("Required."),
});

const RegisterForm = () => {
	const { userStore } = useStoreContext();

	const onSubmit = (values: any, { setErrors, setSubmitting }: FormikHelpers<any>) => {
		userStore.register(values).catch((error) => {
			setSubmitting(false);
			setErrors({ error });
		});
	};

	return (
		<Box bgColor={useColorModeValue("white", "gray.700")} py={6}>
			<Formik initialValues={initialState} validationSchema={registerSchema} onSubmit={onSubmit}>
				{({ handleSubmit, isSubmitting, dirty, isValid, errors }: FormikProps<any>) => (
					<Form onSubmit={handleSubmit}>
						<VStack spacing={6}>
							<Heading>Register</Heading>
							<InputField name="displayName" type="text" />
							<InputField name="username" type="text" />
							<InputField name="email" type="email" />
							<InputField name="password" type="password" />
							<ErrorMessage
								name="error"
								render={() => <ValidationErrors errors={errors.error} />}
							/>
							<Button
								colorScheme="green"
								type="submit"
								isLoading={isSubmitting}
								disabled={!isValid || !dirty || isSubmitting}
							>
								Register
							</Button>
						</VStack>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default observer(RegisterForm);
