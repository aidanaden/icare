import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
} from "@/enums";
import { DataTableData, NominationDataTableData } from "@/interfaces";
import saveAs from "file-saver";

const formatDateToString = (value: Date) => {
  return value.toLocaleDateString("en-GB");
};

const createData = (
  nominee: string,
  department: DepartmentType,
  status: NominationFormStatus,
  date: Date
): DataTableData => {
  return { nominee, department, status, date };
};

const getStatusFromData = (
  data: Omit<NominationDataTableData, "status">
): NominationDataTableData => {
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
};

const convertBase64ToFile = (base64String: string, fileName: string) => {
  const arr = base64String.split(",");
  const patterns = arr[0].match(/:(.*?);/);
  const mime = patterns !== null ? patterns[1] : "application/pdf";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const uint8Array = new Uint8Array(n);
  while (n--) {
    uint8Array[n] = bstr.charCodeAt(n);
  }
  const file = new File([uint8Array], fileName, { type: mime });
  return file;
};

const downloadBase64Data = (base64String: string, fileName: string) => {
  const file = convertBase64ToFile(base64String, fileName);
  saveAs(file, fileName);
};

export {
  formatDateToString,
  getStatusFromData,
  createData,
  convertBase64ToFile,
  downloadBase64Data,
};
