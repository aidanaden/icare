import { DepartmentType } from "@/enums";
import { NominationFormSubmissionDetails } from "@/interfaces";
import { Control } from "react-hook-form";
import FormSelect, { SelectValue } from "../FormSelect";

interface DepartmentSelectProps {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
  depts: DepartmentType[];
}

export default function DepartmentSelect({
  control,
  depts,
}: DepartmentSelectProps) {
  const departmentTypeData: SelectValue[] = Object.values(depts)
    .concat(DepartmentType.ALL)
    .map((dept) => {
      return { label: dept, value: dept };
    })
    .reverse();
  return (
    <>
      <FormSelect
        control={control}
        name="department"
        label="Department"
        defaultValue={"All"}
        data={departmentTypeData}
      />
    </>
  );
}
