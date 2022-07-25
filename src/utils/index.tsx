import { INVALID_NOMINATABLE_STAFF, STARTING_YEAR } from "@/constants";
import {
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevelWinner,
  ShortlistStatus,
} from "@/enums";
import { NominationDataTableData, StaffData } from "@/interfaces";
import saveAs from "file-saver";

const formatDateToString = (value: Date) => {
  return value.toLocaleDateString("en-GB");
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
  data: Omit<NominationDataTableData, "status" | "nomination_date">
): NominationDataTableData => {
  let status = NominationFormStatus.INCOMPLETE;

  if (data.draft_status) {
    // if still in draft
    status = NominationFormStatus.INCOMPLETE;
  } else if (data.is_champion_result) {
    // if champion
    status = NominationFormStatus.CHAMPION;
  } else if (data.is_champion_shortlist_result) {
    // if shortlisted
    status = NominationFormStatus.SHORTLISTED;
  } else if (data.is_service_level_winner === ServiceLevelWinner.TRUE) {
    // if selected as service level winner
    status = NominationFormStatus.AWARDED;
  } else if (data.is_service_level_winner === ServiceLevelWinner.FALSE) {
    // if rejected as service level winner
    status = NominationFormStatus.REJECTED;
  } else if (data.endorsement_status === EndorsementStatus.COMMENDABLE) {
    // if endorsed
    status = NominationFormStatus.ENDORSED;
  } else if (data.endorsement_status === EndorsementStatus.NEUTRAL) {
    // if not endorsed
    status = NominationFormStatus.SUBMITTED;
  } else if (data.endorsement_status === EndorsementStatus.PENDING) {
    // if pending endorsement
    status = NominationFormStatus.PENDING;
  }

  return {
    ...data,
    nomination_status: status,
    nomination_date:
      data.nomination_submitted_date ?? data.nomination_created_date,
  };
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

const getYearsBetweenYearAndCurrent = (year: string) => {
  const years = [];
  for (let i = parseInt(STARTING_YEAR); i <= parseInt(year); i++) {
    years.push(i.toString());
  }
  return years;
};

export {
  formatDateToString,
  getStatusFromData,
  convertServiceLevelWinnerToBoolean,
  convertBooleanToServiceLevelWinner,
  convertBooleanToShortlist,
  convertFileToBase64,
  convertBase64ToFile,
  downloadBase64Data,
  filterInvalidStaffRanksForNomination,
  hashFromString,
  getYearsBetweenYearAndCurrent,
};
