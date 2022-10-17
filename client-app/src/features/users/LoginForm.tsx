import { Box, Button, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import InputField from "~/components/forms/Input";
import { useStoreContext } from "~/stores/store";
import * as yup from "yup";

const schema = yup
	.object({
		email: yup.string().email("Invalid email").required("Required"),
		password: yup.string().required("Required"),
		error: yup.string().optional(),
	})
	.required();

interface LoginFormVals {
	email: string;
	password: string;
	error?: string | null;
}

const LoginForm = () => {
	const {
		userStore: { login },
	} = useStoreContext();
	return (
		<Box bgColor={useColorModeValue("white", "gray.700")} py={6}>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(
					loginValues: LoginFormVals,
					{ setErrors, setSubmitting }: FormikHelpers<LoginFormVals>,
				) => {
					login(loginValues).catch((err) => {
						console.log({ err });
						setErrors({ error: err.response.data?.toString() });
						setSubmitting(false);
					});
				}}
				validationSchema={schema}
			>
				{({ handleSubmit, isSubmitting, dirty, isValid, errors }: FormikProps<LoginFormVals>) => (
					<Form onSubmit={handleSubmit}>
						<VStack spacing={6}>
							<Heading>Login to Reactivities</Heading>
							<InputField name="email" type="email" />
							<InputField name="password" type="password" />
							{errors?.error && <Text>{errors?.error}</Text>}
							<Button type="submit" isLoading={isSubmitting} disabled={!dirty || !isValid}>
								Login
							</Button>
						</VStack>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default observer(LoginForm);
