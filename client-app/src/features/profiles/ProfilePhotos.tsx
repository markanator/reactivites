import {
	Badge,
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Image,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import PhotoUploadWidget from "~/components/imageUpload/PhotoUploadWidget";
import { useStoreContext } from "~/stores/store";
import { Photo, Profile } from "~/types";

type Props = {
	profile: Profile;
};

const ProfilePhotos = ({ profile }: Props) => {
	const { profileStore } = useStoreContext();
	const { isCurrentUser, uploadPhoto, isUploading, isLoading, setMainPhoto, deletePhoto } =
		profileStore;
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState("");

	const handlePhotoUpload = (file: Blob) => {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	};

	const handleSetMainPhoto = (photo: Photo, e: React.SyntheticEvent<HTMLButtonElement>) => {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	};

	const handleDeletePhoto = (photo: Photo, e: React.SyntheticEvent<HTMLButtonElement>) => {
		setTarget(e.currentTarget.name);
		deletePhoto(photo);
	};

	return (
		<VStack alignItems="start" w="full">
			<Flex justifyContent="space-between" w="full">
				<Heading fontSize={"2xl"}>Photos</Heading>
				{isCurrentUser && (
					<Button onClick={() => setAddPhotoMode((prev) => !prev)}>
						{addPhotoMode ? "Cancel" : "Upload Photo"}
					</Button>
				)}
			</Flex>
			<Flex flexWrap="wrap" gap={4} w="full" py={4}>
				{addPhotoMode ? (
					<PhotoUploadWidget handlePhotoUpload={handlePhotoUpload} isUploading={isUploading} />
				) : (
					<>
						{profile?.photos?.map((photo) => (
							<Box
								key={photo.id}
								flex="0 0 250px"
								pos="relative"
								bgColor={useColorModeValue("gray.100", "gray.600")}
								p={4}
							>
								<Image src={photo?.url} w={350} />
								{photo?.isMain && (
									<Badge pos="absolute" top={4} left={4} variant="solid" colorScheme="blue">
										Main
									</Badge>
								)}
								{isCurrentUser && (
									<Flex justifyContent="space-between" mt={4}>
										<Button
											size="sm"
											colorScheme="blue"
											name={"main" + photo.id}
											onClick={(e) => handleSetMainPhoto(photo, e)}
											isLoading={target === "main" + photo.id && isLoading}
											isDisabled={photo.isMain}
										>
											Set Main
										</Button>
										<IconButton
											aria-label={`delete ${photo.id}`}
											icon={<TrashIcon width={16} />}
											size="sm"
											colorScheme="red"
											name={photo.id}
											onClick={(e) => handleDeletePhoto(photo, e)}
											isLoading={target === photo.id && isLoading}
											isDisabled={photo.isMain}
										/>
									</Flex>
								)}
							</Box>
						))}
					</>
				)}
			</Flex>
		</VStack>
	);
};

export default observer(ProfilePhotos);
