import { DepartmentType } from "@/enums";
import { NominationFormSubmissionData } from "@/interfaces";
import { atom } from "recoil";

export const newNominationFormState = atom<NominationFormSubmissionData>({
  key: "newNominationFormState",
  default: {
    case_id: undefined,
    user: undefined,
    department: DepartmentType.ALL,
    description: undefined,
    answers: new Map<string, string>(null),
    files: undefined,
  },
});
