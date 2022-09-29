import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Flex flexDir="column">
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")} h="full">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
