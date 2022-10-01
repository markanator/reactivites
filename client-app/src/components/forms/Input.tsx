import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type Props = InputProps & {
  name: string;
  [k: string]: unknown;
};

const InputField = (props: Props) => {
  const [field, meta] = useField(props.name as string);
  const isInvalid = Boolean(meta.touched && meta.error);
  return (
    <FormControl id={props.name} isInvalid={isInvalid}>
      <VisuallyHidden>
        <FormLabel>{props.name}</FormLabel>
      </VisuallyHidden>
      <Input
        placeholder={props.name}
        bg={useColorModeValue("gray.100", "gray.300")}
        border={0}
        color={"gray.700"}
        _placeholder={{
          color: "gray.600",
          textTransform: "capitalize",
        }}
        {...field}
        {...props}
      />
      {isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
