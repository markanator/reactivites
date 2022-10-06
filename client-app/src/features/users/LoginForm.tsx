import { Box, Button, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import InputField from "~/components/forms/Input";
import { useStoreContext } from "~/stores/store";

interface LoginFormVals {
	email: string;
	password: string;
	error?: string | null;
}

const LoginForm = () => {
	const { userStore } = useStoreContext();
	const onSubmit = (
		v: LoginFormVals,
		{ setErrors, setSubmitting }: FormikHelpers<LoginFormVals>,
	) => {
		userStore.login(v).catch(() => {
			setSubmitting(false);
			setErrors({ error: "Invalid email or password" });
		});
	};
	return (
		<Box bgColor={useColorModeValue("white", "gray.700")} py={6}>
			<Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
				{({ handleSubmit, isSubmitting }: FormikProps<LoginFormVals>) => (
					<Form onSubmit={handleSubmit}>
						<VStack spacing={6}>
							<Heading>Login to Reactivities</Heading>
							<InputField name="email" type="email" />
							<InputField name="password" type="password" />
							<ErrorMessage name="error" />
							<Button type="submit" disabled={isSubmitting}>
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
