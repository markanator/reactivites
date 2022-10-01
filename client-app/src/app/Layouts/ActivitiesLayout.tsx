import { Box, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  return (
    <Flex flexDir="column">
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")} h="full" pb={8}>
        <Outlet />
      </Box>
      <Flex
        as="footer"
        justifyContent="center"
        bg={useColorModeValue("gray.200", "gray.800")}
        alignItems="center"
        py={4}
      >
        <Text>
          Developed with 🧠 by:{" "}
          <Link
            fontWeight={600}
            href="https://twitter.com/_mark_ambro"
            target="_blank"
          >
            Mark Ambro
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default App;
