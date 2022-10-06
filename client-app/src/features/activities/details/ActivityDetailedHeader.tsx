import {
	Badge,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { MapPinIcon, ClockIcon, TagIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import CalendarDate from "~/components/CalendarDate";
import { useStoreContext } from "~/stores/store";
import { Activity } from "~/types";

type Props = {
	activity: Activity;
};

const ActivityDetailedHeader = ({ activity }: Props) => {
	const { activityStore } = useStoreContext();
	const { updateAttendance, isLoading, cancelActivityToggle } = activityStore;
	return (
		<Flex
			flexDir="column"
			w="full"
			bgColor={useColorModeValue("gray.100", "gray.700")}
			pos="relative"
		>
			<Box
				backgroundImage={`url("/assets/categoryImages/${activity.category}.jpg")`}
				backgroundSize="cover"
				backgroundPosition="bottom"
				height="400px"
				pos="relative"
			/>
			<Container maxW={"8xl"} pt={4}>
				<Flex justifyContent="space-between" alignItems="center" py={6}>
					<Flex w="full">
						<CalendarDate date={activity.date!} />
						<Flex flexDir="column" w="full">
							<Flex justifyContent="start" alignItems="center">
								<Heading as="h5" fontSize="3xl" mb={2} mt={-1} textTransform="capitalize">
									{activity.title}
								</Heading>
								{activity.isCancelled && (
									<Badge ml={4} mt={-2} display="flex" colorScheme="red" fontSize="lg">
										Activity is Cancelled
									</Badge>
								)}
							</Flex>
							<Flex flexDir="row" alignItems="center">
								<Flex alignItems="center">
									<TagIcon width={16} height={16} />
									<Text ml={1} textTransform="capitalize">
										{activity.category}
									</Text>
								</Flex>
								<Flex alignItems="center" ml={4}>
									<MapPinIcon width={16} height={16} />
									<Text ml={1} textTransform="capitalize">
										{activity.city + ", " + activity.venue}
									</Text>
								</Flex>
								<Flex alignItems="center" ml={4}>
									<ClockIcon width={16} height={16} />
									<Text ml={1} textTransform="capitalize">
										{dayjs(activity.date).format("ddd, MMMM D, YYYY (h:mm A)")}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<VStack as="fieldset" disabled={isLoading}>
						{!activity?.isHost && activity?.isGoing && (
							<Button w="full" colorScheme="yellow" size="lg" onClick={updateAttendance}>
								Cancel Attendance
							</Button>
						)}
						{!activity?.isHost && !activity?.isGoing && (
							<Button
								colorScheme="teal"
								size="lg"
								onClick={updateAttendance}
								disabled={activity.isCancelled}
							>
								Register to Attend
							</Button>
						)}
						{activity?.isHost && (
							<>
								<Button
									colorScheme={activity.isCancelled ? "green" : "red"}
									onClick={cancelActivityToggle}
									isLoading={isLoading}
								>
									{activity.isCancelled ? "Re-activate Activity" : "Cancel Activity"}
								</Button>
								<Button
									as={Link}
									disabled={activity.isCancelled}
									to={`/activities/${activity.id}/manage`}
									w="full"
									colorScheme="orange"
									size="md"
								>
									Manage Event
								</Button>
							</>
						)}
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default observer(ActivityDetailedHeader);
