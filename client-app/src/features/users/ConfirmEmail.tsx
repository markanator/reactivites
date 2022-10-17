import { EmailIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import agent from "~/async/fetcher/agent";
import useQuery from "~/hooks/useQuery";
import LoginModal from "./LoginModal";

const Status = {
	Verifying: "Verifying",
	Failed: "Failed",
	Success: "Success",
};

const ConfirmEmail = () => {
	const toast = useToast();
	const email = useQuery().get("email") as string;
	const token = useQuery().get("token") as string;
	const [status, setStatus] = useState(Status.Verifying);

	const handleConfirmEmailResend = async () => {
		try {
			await agent.Account.resendEmailConfirm(email);
			toast({
				position: "bottom-right",
				status: "success",
				title: "Email sent.",
				description: "Verification email resent - please check your email.",
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// poll endpoint
		agent.Account.verifyEmail(token, email)
			.then(() => {
				setStatus(Status.Success);
			})
			.catch((err) => {
				console.log(err);
				setStatus(Status.Failed);
			});
	}, [email, token]);

	const getBodyContent = () => {
		switch (status) {
			case Status.Verifying:
				return <p>Verifying...</p>;
			case Status.Failed:
				return (
					<VStack spacing={12}>
						<Text>Verification failed. You can try resending the verify link to your email</Text>
						<Button onClick={handleConfirmEmailResend}>Resend Email</Button>
					</VStack>
				);
			case Status.Success:
				return (
					<VStack spacing={12}>
						<Text>Email has been verified - you can now login</Text>
						<LoginModal />
					</VStack>
				);
		}
	};

	return (
		<Container mx="auto" maxW="5xl" mt={100}>
			<VStack spacing={4}>
				<EmailIcon w={100} h={100} />
				<Heading>Email verification</Heading>
			</VStack>
			<Flex flexDir="column" mt={12}>
				{getBodyContent()}
			</Flex>
		</Container>
	);
};

export default ConfirmEmail;
