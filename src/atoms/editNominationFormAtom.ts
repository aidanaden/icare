import { DepartmentType } from "@/enums";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import { atom } from "recoil";

export const editNominationFormState = atom<NominationFormSubmissionData>({
  key: "editNominationFormState",
  default: {
    user: undefined,
    department: DepartmentType.ALL,
    description: "",
    answers: new Map<string, string>(null),
    files: undefined,
  },
  // effects: [
  //   ({ onSet }) => {
  //     onSet((newNominationFormState) => {
  //       if (newNominationFormState.user) {
  //         console.log("updated form data: ", newNominationFormState);
  //         upsertNominationForm(
  //           newNominationFormState.user?.staff_id,
  //           newNominationFormState,
  //           true
  //         );
  //       }
  //     });
  //   },
  // ],
});
