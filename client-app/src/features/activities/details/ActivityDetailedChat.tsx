import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Link,
	Text,
	Textarea,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStoreContext } from "~/stores/store";
import relativeTime from "dayjs/plugin/relativeTime";
import { Form, Formik, FormikProps } from "formik";
import InputTextArea from "~/components/forms/InputTextArea";
import * as yup from "yup";

const commentReplySchema = yup
	.object({
		body: yup
			.string()
			.min(2, "Comment to short")
			.max(256, "Comment too large")
			.required("Required"),
	})
	.required();

dayjs.extend(relativeTime);

type Props = {
	activityId: string;
};

const ActivityDetailedChat = ({ activityId }: Props) => {
	const { commentStore, userStore } = useStoreContext();
	const { createHubConnection, clearComments, comments, addComment } = commentStore;
	useEffect(() => {
		if (activityId) {
			createHubConnection(activityId);
		}
		return clearComments;
	}, [activityId, createHubConnection, clearComments]);

	return (
		<Flex flexDir="column" p={4} bg={useColorModeValue("white", "gray.700")} boxShadow={"sm"}>
			<Heading
				as="h4"
				fontSize="2xl"
				mb={8}
				display="block"
				pos="relative"
				_after={{
					position: "absolute",
					bottom: "-15px",
					left: "0px",
					content: '""',
					width: "30px",
					height: "1px",
					backgroundColor: "#e86c60",
				}}
			>
				Comments
			</Heading>
			<Flex flexDir="column" w="full">
				{/* AUTH REQUIRED */}
				{!userStore.isLoggedIn ? (
					<Text mb={8}>
						You must be{" "}
						<Link textColor="blue.500" fontWeight={500}>
							logged in
						</Link>{" "}
						to post a comment.
					</Text>
				) : (
					<Formik
						initialValues={{ body: "" }}
						validationSchema={commentReplySchema}
						onSubmit={(val, { resetForm }) => {
							addComment(val).then(() => resetForm());
						}}
					>
						{({ isSubmitting, dirty, isValid, handleSubmit }: FormikProps<any>) => (
							<Form>
								<Box w="full" mb={6}>
									<HStack alignItems="start">
										<InputTextArea
											name="body"
											placeholder="Add a comment (Press Enter to submit, SHIFT + Enter for new line)"
											resize="vertical"
											onKeyDown={(e) => {
												if (e.key === "Enter" && e.shiftKey) {
													return;
												}
												if (e.key === "Enter" && !e.shiftKey) {
													e.preventDefault();
													isValid && dirty && handleSubmit();
												}
											}}
										/>
										<Button
											type="submit"
											isDisabled={!dirty || !isValid}
											isLoading={isSubmitting}
											colorScheme="teal"
											size="md"
										>
											Add Reply
										</Button>
									</HStack>
								</Box>
							</Form>
						)}
					</Formik>
				)}

				{userStore.isLoggedIn && (
					<Flex flexDir="column" w="full">
						{/* SINGLE COMMENT */}
						{comments.map((comm) => (
							<Flex key={comm?.id} w="full" pos="relative" pt={1} mt={2}>
								<Avatar src={comm?.image ?? "/assets/user.png"} name={comm?.displayName} />
								<Flex flexDir="column" ml={4}>
									<Flex alignItems="center">
										<Text as={Link} to={`/profiles/${comm.username}`} fontWeight={700}>
											{comm?.displayName}
										</Text>
										<Text ml={2} fontSize="xs" textColor="gray.500">
											{dayjs(comm.createdAt).fromNow()}
										</Text>
									</Flex>
									<Text whiteSpace="pre-wrap">{comm.body}</Text>
									<Flex>
										{/* <Button variant="link" size="xs">
                      Reply
                    </Button> */}
									</Flex>
								</Flex>
							</Flex>
						))}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default observer(ActivityDetailedChat);
