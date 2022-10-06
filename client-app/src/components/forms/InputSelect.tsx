import {
	FormControl,
	VisuallyHidden,
	FormLabel,
	Select,
	FormErrorMessage,
	SelectProps,
	useColorModeValue,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type Props = SelectProps & {
	name: string;
	options: { label: string; value: string | number }[];
	[k: string]: unknown;
};

const InputSelect = ({ name, options, ...rest }: Props) => {
	const [field, meta] = useField(name);
	const isInvalid = Boolean(meta.touched && meta.error);

	return (
		<FormControl id={name} isInvalid={isInvalid}>
			<VisuallyHidden>
				<FormLabel>{name}</FormLabel>
			</VisuallyHidden>
			<Select
				bgColor={useColorModeValue("gray.100", "gray.300")}
				color={"black"}
				placeholder={`Select a ${name}`}
				{...rest}
				{...field}
			>
				{options?.map(({ label, value }) => (
					<option key={label} value={value}>
						{label}
					</option>
				))}
			</Select>

			{isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
		</FormControl>
	);
};

export default InputSelect;
