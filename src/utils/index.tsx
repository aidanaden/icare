import { INVALID_NOMINATABLE_STAFF } from "@/constants";
import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevelWinner,
  ShortlistStatus,
} from "@/enums";
import {
  DataTableData,
  NominationDataTableData,
  StaffData,
} from "@/interfaces";
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

const convertServiceLevelWinnerToBoolean = (slw?: ServiceLevelWinner) => {
  return slw === ServiceLevelWinner.TRUE ? true : false;
};

const convertBooleanToServiceLevelWinner = (bool?: boolean) => {
  return bool ? ServiceLevelWinner.TRUE : ServiceLevelWinner.FALSE;
};

const convertBooleanToShortlist = (bool?: boolean) => {
  return bool ? ShortlistStatus.TRUE : ShortlistStatus.FALSE;
};

const getStatusFromData = (
  data: Omit<NominationDataTableData, "status">
): NominationDataTableData => {
  let status = NominationFormStatus.INCOMPLETE;

  if (data.is_champion_result) {
    status = NominationFormStatus.CHAMPION;
  } else if (data.is_champion_shortlist_result) {
    status = NominationFormStatus.SHORTLISTED;
  } else if (data.is_service_level_winner) {
    status = NominationFormStatus.AWARDED;
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

  return { ...data, nomination_status: status };
};

const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
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

const filterInvalidStaffRanksForNomination = (
  data?: StaffData[],
  nominator_id?: string
) => {
  const filteredData = data?.filter(
    (staff) =>
      staff.staff_id != nominator_id &&
      staff.staff_corporate_rank !== null &&
      !INVALID_NOMINATABLE_STAFF.includes(
        staff.staff_corporate_rank.toLowerCase()
      )
  );
  return filteredData;
};

const hashFromString = (str: string) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// const convertCookieValueToString = (cookieValue: str) => {

// }

export {
  formatDateToString,
  getStatusFromData,
  convertServiceLevelWinnerToBoolean,
  convertBooleanToServiceLevelWinner,
  convertBooleanToShortlist,
  createData,
  convertFileToBase64,
  convertBase64ToFile,
  downloadBase64Data,
  filterInvalidStaffRanksForNomination,
  hashFromString,
};
