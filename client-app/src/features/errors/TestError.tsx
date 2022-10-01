import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "~/async/fetcher";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
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
