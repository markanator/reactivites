import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Container maxW={"8xl"} pt={4}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default observer(App);
