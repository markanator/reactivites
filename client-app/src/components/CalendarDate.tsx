import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";

type Props = {
	date: Date | string;
};

const CalendarDate = ({ date }: Props) => {
	const { dayOfMonth, month } = useMemo(
		() => ({
			month: dayjs(date).format("MMM"),
			dayOfMonth: dayjs(date).format("D"),
		}),
		[date],
	);
	return (
		<Flex mr={3} flexDir="column" textAlign="center" borderRadius="md" w="3.125rem">
			<Box
				bgColor="red.500"
				textColor="white"
				borderTopRadius=".375rem"
				p={1}
				fontWeight="semibold"
				lineHeight="none"
			>
				{month}
			</Box>
			<Box
				borderTopColor="initial"
				textColor={useColorModeValue("gray.700", "gray.100")}
				fontSize="2xl"
				p={".15rem"}
				border=".125rem solid var(--chakra-colors-red-500)"
				borderBottomRadius=".375rem"
				fontWeight={700}
				lineHeight="short"
			>
				{dayOfMonth}
			</Box>
		</Flex>
	);
};

export default CalendarDate;
