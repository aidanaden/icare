import StyledMenuItem from "@/components/Common/Menu/StyledMenuItem";
import { DepartmentType } from "@/enums";
import { NominationFormSubmissionDetails } from "@/interfaces";
import { FormControl, InputLabel, Select, OutlinedInput } from "@mui/material";
import { Controller, Control, FieldValues } from "react-hook-form";

export interface SelectValue {
  label: string;
  value: number | string;
}

interface FormSelectProps {
  control: any;
  data: SelectValue[];
  label: string;
  name: string;
  defaultValue: unknown;
}

export default function FormSelect({
  control,
  data,
  label,
  name,
  defaultValue,
}: FormSelectProps) {
  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <InputLabel
        id={`${name}-simple-select-helper-label`}
        sx={{ color: "black" }}
      >
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            labelId={`${name}-simple-select-helper-label`}
            id={`${name}-simple-select-helper`}
            label={label}
            {...field}
            inputRef={field.ref}
            input={
              <OutlinedInput
                label={label}
                sx={{
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              />
            }
          >
            {data.map((obj) => (
              <StyledMenuItem key={obj.label} value={obj.value}>
                {obj.label}
              </StyledMenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
