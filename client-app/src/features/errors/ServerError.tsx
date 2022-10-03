import { Container, Flex, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";

const ServerError = () => {
  const { commonStore } = useStoreContext();
  return (
    <Container display="flex" flexDir="column" alignItems="center">
      <Heading my={8}>Server Error</Heading>
      <Heading as="h5" fontSize="xl">
        {commonStore.error?.message}
      </Heading>
      {commonStore.error?.details && (
        <Flex flexDir="column" as={Link} to="/activities">
          <Heading as="h6" fontSize="2xl">
            Stack Trace
          </Heading>
          <Flex as="code" mt={8}>
            {commonStore.error?.details}
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default observer(ServerError);
