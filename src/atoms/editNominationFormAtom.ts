import { NominationFormSubmissionData } from "@/interfaces";
import { atom } from "recoil";

export const editNominationFormState = atom<NominationFormSubmissionData>({
  key: "editNominationFormState",
  default: {
    user: undefined,
    department: "All",
    description: undefined,
    answers: new Map<string, string>(null),
    files: undefined,
  },
});
