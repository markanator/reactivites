import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
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
    <Container mx={"auto"} padding={10} bgColor="white" my={40}>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting, errors }: FormikProps<any>) => (
          <Form onSubmit={handleSubmit}>
            <VStack>
              <InputField name="email" type="email" />
              <InputField name="password" type="password" />
              {/* @ts-expect-error */}
              <Text>{errors?.error}</Text>
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default observer(LoginForm);
