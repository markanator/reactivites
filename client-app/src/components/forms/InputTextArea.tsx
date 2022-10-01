import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  Textarea,
  FormErrorMessage,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type Props = TextareaProps & {
  name: string;
};

const InputTextArea = ({ name, ...rest }: Props) => {
  const [field, meta] = useField(name);
  const isInvalid = Boolean(meta.touched && meta.error);

  return (
    <FormControl id={name} isInvalid={isInvalid}>
      <VisuallyHidden>
        <FormLabel>{name}</FormLabel>
      </VisuallyHidden>
      <Textarea
        placeholder={name}
        bg={"gray.100"}
        border={0}
        color={"gray.700"}
        resize="vertical"
        _placeholder={{
          color: "gray.600",
          textTransform: "capitalize",
        }}
        {...field}
        {...rest}
      />

      {isInvalid && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputTextArea;
