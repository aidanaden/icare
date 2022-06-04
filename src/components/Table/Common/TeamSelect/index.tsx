import StyledMenuItem from "@/components/Common/Menu/StyledMenuItem";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  alpha,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface TeamSelectProps {
  teams: string[];
  teamType: string;
  setTeamType: Dispatch<SetStateAction<string>>;
}

export default function TeamSelect({
  teams,
  teamType,
  setTeamType,
}: TeamSelectProps) {
  console.log("initial team type value: ", teamType);

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log("handle select change!");
    setTeamType(event.target.value as string);
  };

  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <InputLabel id="team-simple-select-label" sx={{ color: "black" }}>
        Team
      </InputLabel>
      <Select
        labelId="team-simple-select-helper-label"
        id="team-simple-select-helper"
        value={teamType}
        label="Team"
        onChange={handleSelectChange}
        input={
          <OutlinedInput
            label="Team"
            sx={{
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          />
        }
      >
        {teams.map((t) => (
          <StyledMenuItem key={t} value={t.toString()}>
            {t}
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
