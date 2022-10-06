import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
	return (
		<Flex flexDir="column">
			<Navbar />
			<Outlet />
		</Flex>
	);
};

export default Layout;
