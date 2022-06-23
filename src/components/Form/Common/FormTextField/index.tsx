import StyledTextField from "@/components/Common/StyledTextField";
import React from "react";
import { Controller } from "react-hook-form";

interface FormTextFieldProps {
  control: any;
  label: string;
  name: string;
  error: string | undefined;
  placeholder: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  multiLine?: boolean;
}

export default function FormTextField({
  control,
  label,
  name,
  error,
  placeholder,
  type,
  multiLine = false,
}: FormTextFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyledTextField
            multiline={multiLine}
            rows={multiLine ? 5 : 1}
            // maxRows={multiLine ? 100 : 1}
            sx={{ flexGrow: 1 }}
            size="medium"
            color="secondary"
            id={name}
            label={label}
            helperText={error}
            required
            {...field}
            inputRef={field.ref}
            placeholder={placeholder}
            type={type}
          />
        )}
      />
    </>
  );
}
