import { DepartmentType } from "@/enums";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import { atom } from "recoil";

export const nominationFormState = atom<NominationFormSubmissionData>({
  key: "nominationFormState",
  default: {
    case_id: undefined,
    user: undefined,
    department: DepartmentType.ALL,
    description: undefined,
    answers: new Map<string, string>(null),
    files: undefined,
  },
});
