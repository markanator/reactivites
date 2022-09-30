import React from "react";
import {
  ButtonGroup,
  Heading,
  HStack,
  Button,
  Container,
  useToast,
} from "@chakra-ui/react";
import axios from "~/async/fetcher";
import { useState } from "react";
import ValidationErrors from "./ValidationErrors";
import { useAttachScripts } from "~/app/hooks/useAttachScripts";

export default function TestErrors() {
  useAttachScripts();
  const [errors, setErrs] = useState(null);
  const handleNotFound = () => {
    axios.get("buggy/not-found").catch((err) => console.log(err.response));
  };

  const handleBadRequest = () => {
    axios.get("buggy/bad-request").catch((err) => console.log(err.response));
  };

  const handleServerError = () => {
    axios.get("buggy/server-error").catch((err) => console.log(err.response));
  };

  const handleUnauthorised = () => {
    axios.get("buggy/unauthorised").catch((err) => console.log(err.response));
  };

  const handleBadGuid = () => {
    axios.get("activities/notaguid").catch((err) => console.log(err.response));
  };

  const handleValidationError = () => {
    axios.post("activities", {}).catch((err) => setErrs(err));
  };

  return (
    <Container
      mx="auto"
      display="flex"
      flexDir="column"
      alignItems="center"
      py={20}
    >
      <Heading mb={8}>Test Error component</Heading>
      <HStack>
        <ButtonGroup>
          <Button onClick={handleNotFound}>Not Found</Button>
          <Button onClick={handleBadRequest}>Bad Request</Button>
          <Button onClick={handleValidationError}>Validation Error</Button>
          <Button onClick={handleServerError}>Server Error</Button>
          <Button onClick={handleUnauthorised}>Unauthorised</Button>
          <Button onClick={handleBadGuid}>Bad Guid</Button>
        </ButtonGroup>
      </HStack>
      {errors && <ValidationErrors errors={errors} />}
    </Container>
  );
}
