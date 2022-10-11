import {
	Box,
	HStack,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ListItemSkeleton = () => {
	const itemBgColor = useColorModeValue("white", "gray.700");

	return (
		<Box padding="6" mb={6} boxShadow="lg" bg={itemBgColor}>
			<HStack>
				<SkeletonCircle size="10" />
				<SkeletonText noOfLines={1} />
			</HStack>
			<Skeleton height="320px" />
			<SkeletonText mt="4" noOfLines={4} spacing={6} />
		</Box>
	);
};

export default ListItemSkeleton;
