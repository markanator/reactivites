import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {
  errors?: string[];
};

const ValidationErrors = ({ errors }: Props) => {
  return (
    <Stack mt={4}>
      {errors &&
        errors.map((er) => (
          <Alert key={er} status="error" variant="subtle">
            <AlertIcon />
            {er}
          </Alert>
        ))}
    </Stack>
  );
};

export default ValidationErrors;
