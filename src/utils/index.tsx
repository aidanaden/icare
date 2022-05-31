import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
} from "@/enums";
import { DataTableData, NominationDataTableData } from "@/interfaces";

export function formatDateToString(value: Date) {
  return value.toLocaleDateString("en-GB");
}

export function createData(
  nominee: string,
  department: DepartmentType,
  status: NominationFormStatus,
  date: Date
): DataTableData {
  return { nominee, department, status, date };
}

export function getStatusFromData(
  data: Omit<NominationDataTableData, "status">
): NominationDataTableData {
  let status = NominationFormStatus.INCOMPLETE;

  if (data.is_champion_result) {
    status = NominationFormStatus.AWARDED;
  } else if (data.is_champion_shortlist_result) {
    status = NominationFormStatus.SHORTLISTED;
  } else if (
    data.endorsement_status === EndorsementStatus.COMMENDABLE &&
    !data.draft_status
  ) {
    status = NominationFormStatus.ENDORSED;
  } else if (
    data.endorsement_status === EndorsementStatus.NEUTRAL &&
    !data.draft_status
  ) {
    status = NominationFormStatus.SUBMITTED;
  } else if (
    data.endorsement_status === EndorsementStatus.PENDING &&
    !data.draft_status
  ) {
    status = NominationFormStatus.PENDING;
  } else if (data.draft_status) {
    status = NominationFormStatus.INCOMPLETE;
  }

  return { ...data, status: status };
}

export const objToLowerCase = (obj: any) => {
  if (!obj) return obj;
  return Object.keys(obj).reduce(
    (prev, current) => ({
      ...prev,
      [current.toLowerCase()]: obj[current].toLowerCase(),
    }),
    {}
  );
};
