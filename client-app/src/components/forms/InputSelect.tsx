import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  Select,
  FormErrorMessage,
  SelectProps,
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
        _placeholder={{
          color: "gray.600",
          textTransform: "capitalize",
        }}
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
