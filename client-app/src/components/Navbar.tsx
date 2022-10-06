import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Collapse,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import DesktopNav from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onToggle } = useDisclosure();
	const {
		userStore: { user, logout },
	} = useStoreContext();

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 8 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} alignItems="center">
					<Text
						as={NavLink}
						to="/"
						textAlign={useBreakpointValue({ base: "center", md: "left" })}
						fontFamily={"heading"}
						color={useColorModeValue("gray.800", "white")}
					>
						Reactivities
					</Text>

					<Flex display={{ base: "none", md: "flex" }} alignItems="center" ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					alignItems="center"
					direction={"row"}
					spacing={6}
				>
					<Button onClick={toggleColorMode} variant="ghost" size="sm">
						{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					</Button>
					{!user ? (
						<>
							<Button as={Link} fontSize={"sm"} fontWeight={400} variant={"link"} to={"/login"}>
								Sign In
							</Button>
							<Button
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								fontWeight={600}
								color={"white"}
								bg={"green.400"}
								_hover={{
									bg: "green.300",
								}}
							>
								Sign Up
							</Button>
						</>
					) : (
						<>
							<Menu>
								<MenuButton>
									<Avatar size="sm" name={user?.displayName} src={user?.image} />
								</MenuButton>
								<MenuList>
									<MenuItem as={Link} to={`/profiles/${user?.username}`}>
										Profile
									</MenuItem>
									<MenuItem onClick={logout}>Logout</MenuItem>
								</MenuList>
							</Menu>
						</>
					)}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
};

export default observer(Navbar);
