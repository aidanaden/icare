import StyledMenuItem from "@/components/Common/Menu/StyledMenuItem";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export interface SelectProps<K> {
  header: string;
  values: K[];
  defaultValue: K;
  setValueType: Dispatch<SetStateAction<K>>;
}

export default function index({
  header,
  values,
  defaultValue,
  setValueType,
}: SelectProps<string>) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    setValueType(event.target.value as string);
  };

  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <InputLabel id="simple-select-label" sx={{ color: "black" }}>
        {header}
      </InputLabel>
      <Select
        labelId="team-simple-select-helper-label"
        id="team-simple-select-helper"
        value={defaultValue}
        label={header}
        onChange={handleSelectChange}
        input={
          <OutlinedInput
            label={header}
            sx={{
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          />
        }
      >
        {values.map((t) => (
          <StyledMenuItem key={t} value={t.toString()}>
            {t}
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
