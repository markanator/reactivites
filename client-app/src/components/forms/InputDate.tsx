import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import styles from "./datepicker.module.css";

type Props = Partial<ReactDatePickerProps> & {
	name: string;
};

const InputDate = ({ name, ...rest }: Props) => {
	const [field, meta, helpers] = useField(name);
	const isInvalid = Boolean(meta.touched && meta.error);

	return (
		<FormControl id={name} isInvalid={isInvalid}>
			<VisuallyHidden>
				<FormLabel>{name}</FormLabel>
			</VisuallyHidden>
			<DatePicker
				customInput={
					<Input
						bgColor={useColorModeValue("gray.100", "gray.300")}
						border={0}
						color={"gray.700"}
						_placeholder={{
							color: "gray.600",
							textTransform: "capitalize",
						}}
					/>
				}
				placeholderText={name}
				{...field}
				{...rest}
				selected={(field.value && new Date(field.value)) || null}
				onChange={(v) => helpers.setValue(v)}
			/>

			{isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
		</FormControl>
	);
};

export default InputDate;
