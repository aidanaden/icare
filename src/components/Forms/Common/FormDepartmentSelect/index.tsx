import { DepartmentType } from "@/enums";
import { NominationFormSubmissionDetails } from "@/interfaces";
import { Control } from "react-hook-form";
import FormSelect, { SelectValue } from "../FormSelect";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";

interface DepartmentSelectProps {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
}

export default function DepartmentSelect({ control }: DepartmentSelectProps) {
  const departmentTypeData: SelectValue[] = Object.values(DepartmentType).map(
    (dept) => {
      return { label: dept, value: dept };
    }
  );
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);
  return (
    <>
      <FormSelect
        control={control}
        name="department"
        label="Department"
        defaultValue={DepartmentType.AUDIT}
        data={departmentTypeData}
      />
    </>
  );
}
