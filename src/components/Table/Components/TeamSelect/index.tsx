import React, { Dispatch, SetStateAction } from "react";
import Select from "@/components/Common/Select";

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
  return (
    <Select
      header="Team"
      values={teams}
      defaultValue={teamType}
      setValueType={setTeamType}
    />
  );
}
