import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex flexDir="column">
      <Navbar />
      <Outlet />
    </Flex>
  );
};

export default Layout;
