import StyledTextField from "@/components/Common/StyledTextField";
import React from "react";
import { Controller } from "react-hook-form";

interface FormTextFieldProps {
  control: any;
  defaultValue: string | undefined;
  label: string;
  name: string;
  error: string | undefined;
  multiLine: boolean;
}

export default function FormTextField({
  control,
  label,
  name,
  error,
  defaultValue,
  multiLine,
}: FormTextFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <StyledTextField
            multiline={multiLine}
            rows={multiLine ? 5 : 1}
            size="medium"
            color="secondary"
            id={name}
            label={label}
            helperText={error}
            required
            {...field}
            inputRef={field.ref}
          />
        )}
      />
    </>
  );
}
