import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import InputField from "~/components/forms/Input";
import { useStoreContext } from "~/stores/store";

type Props = {};

interface LoginFormVals {
  email: string;
  password: string;
  error?: string;
}

const LoginForm = (props: Props) => {
  const { userStore } = useStoreContext();
  const onSubmit = (
    v: any,
    { setErrors, setSubmitting }: FormikHelpers<any>
  ) => {
    userStore.login(v).catch((err) => {
      setSubmitting(false);
      setErrors({ error: "Invalid email or password" });
    });
  };
  return (
    <Box bgColor={useColorModeValue("white", "gray.700")} py={6}>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting }: FormikProps<any>) => (
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
