import { DepartmentType } from "@/enums";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import { atom } from "recoil";

export const nominationFormState = atom<NominationFormSubmissionData>({
  key: "nominationFormState",
  default: {
    user: undefined,
    department: DepartmentType.AUDIT,
    description: "",
    answers: new Map<string, string>(null),
    files: undefined,
  },
  effects: [
    ({ onSet }) => {
      onSet((newNominationFormState) => {
        upsertNominationForm(newNominationFormState);
      });
    },
  ],
});
