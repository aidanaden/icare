import StyledMenuItem from "@/components/Common/Menu/StyledMenuItem";
import { DepartmentType } from "@/enums";
import theme from "@/styles/theme";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  alpha,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface DepartmentSelectProps {
  departments: DepartmentType[];
  departmentType: DepartmentType;
  setDepartmentType: Dispatch<SetStateAction<DepartmentType>>;
}

export default function DepartmentSelect({
  departments,
  departmentType,
  setDepartmentType,
}: DepartmentSelectProps) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    setDepartmentType(event.target.value as DepartmentType);
  };

  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
        Department
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={departmentType}
        label="Department"
        onChange={handleSelectChange}
        input={
          <OutlinedInput
            label="Department"
            sx={{
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          />
        }
      >
        {departments.map((dept) => (
          <StyledMenuItem key={dept} value={dept.toString()}>
            {dept}
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
