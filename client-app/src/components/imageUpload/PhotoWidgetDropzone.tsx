import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
	setFiles: (files: any) => void;
};

const PhotoWidgetDropzone = ({ setFiles }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: any[]) => {
			setFiles(
				acceptedFiles.map((file: any) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
		},
		[setFiles],
	);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<Flex
			{...getRootProps()}
			border="dashed 3px var(--chakra-colors-gray-300)"
			p={8}
			flexDir="column"
			alignItems="center"
			w="full"
			mr={3}
		>
			<input {...getInputProps()} />
			<ArrowUpTrayIcon width={50} />
			<Heading mt={2} fontSize="xl">
				Drop image here.
			</Heading>
		</Flex>
	);
};

export default PhotoWidgetDropzone;
