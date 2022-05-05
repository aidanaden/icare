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
  departmentType: DepartmentType;
  setDepartmentType: Dispatch<SetStateAction<DepartmentType>>;
}

export default function DepartmentSelect({
  departmentType,
  setDepartmentType,
}: DepartmentSelectProps) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    setDepartmentType(event.target.value as DepartmentType);
  };

  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
        Nomination
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
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "6px",
              minWidth: 180,
              color:
                theme.palette.mode === "light"
                  ? "rgb(55, 65, 81)"
                  : theme.palette.grey[300],
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              "& .MuiMenu-list": {
                pt: "6px",
                px: "6px",
                pb: "2px",
              },
              "& .MuiMenuItem-root": {
                mb: "4px",
                borderRadius: "6px",
                "& .MuiSvgIcon-root": {
                  fontSize: 18,
                  color: theme.palette.text.secondary,
                  marginRight: theme.spacing(1.5),
                },
                "&:active": {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                  ),
                },
              },
            },
          },
        }}
      >
        {Object.values(DepartmentType).map((dept) => (
          <StyledMenuItem key={dept} value={dept.toString()}>
            {dept}
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
