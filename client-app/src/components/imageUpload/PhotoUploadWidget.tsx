import { Box, Button, ButtonGroup, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

type Props = {
	isUploading: boolean;
	handlePhotoUpload: (file: Blob) => void;
};

const PhotoUploadWidget = ({ handlePhotoUpload, isUploading }: Props) => {
	const [files, setFiles] = useState<any[]>([]);
	const [cropper, setCropper] = useState<Cropper>();

	function onCrop() {
		if (cropper) {
			cropper.getCroppedCanvas().toBlob((blob) => handlePhotoUpload(blob!));
		}
	}

	useEffect(() => {
		return () => {
			// remove preview from memory
			files?.forEach((file: any) => URL.revokeObjectURL(file?.preview));
		};
	}, [files]);

	return (
		<VStack spacing={6} w="full">
			<Flex justifyContent="space-between" w="full" px={6}>
				<Text fontSize="xl">Step 1: Add Photo</Text>
				<Text fontSize="xl">Step 2: Resize Image</Text>
				<Text fontSize="xl">Step 3: Preview & Upload</Text>
			</Flex>
			<HStack w="full" justifyContent="flex-start" alignItems="flex-start">
				<Flex flex="0 0 33.33%">
					<PhotoWidgetDropzone setFiles={setFiles} />
				</Flex>
				<Flex flex="0 0 33.33%" alignItems="center">
					{files && files.length > 0 && (
						<PhotoWidgetCropper setCropper={setCropper} imagePreview={files?.[0]?.preview} />
					)}
				</Flex>
				<Flex flex="0 0 33.33%">
					{files && files.length > 0 && (
						<Flex flexDir="column" alignItems="center" w="full">
							<Box className="img-preview" minH={200} w="full" overflow="hidden" />
							<ButtonGroup size="lg" isAttached variant="solid" mt={6}>
								<Button colorScheme="blue" isLoading={isUploading} onClick={onCrop}>
									Save
								</Button>
								<Button colorScheme="red" isDisabled={isUploading} onClick={() => setFiles([])}>
									Close
								</Button>
							</ButtonGroup>
						</Flex>
					)}
				</Flex>
			</HStack>
		</VStack>
	);
};

export default observer(PhotoUploadWidget);
