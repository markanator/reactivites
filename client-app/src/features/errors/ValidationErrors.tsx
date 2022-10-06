/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {
	errors?: any;
};

const ValidationErrors = ({ errors }: Props) => {
	return (
		<Stack mt={4}>
			{errors &&
				errors?.map((er: any, idx: any) => (
					<Alert key={idx} status="error" variant="subtle">
						<AlertIcon />
						{er}
					</Alert>
				))}
		</Stack>
	);
};

export default ValidationErrors;
