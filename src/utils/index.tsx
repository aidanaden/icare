import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevel,
} from "@/enums";
import { NominationDataTableData } from "@/interfaces";
import { date } from "yup";

export function formatDateToString(value: Date) {
  return value.toLocaleDateString("en-GB");
}

export function getNominationFormStatus(
  endorsement_status: EndorsementStatus,
  is_service_level_winner: boolean,
  champion_shortlist_status: boolean,
  is_champion: boolean,
  draft_status: boolean
): NominationFormStatus {
  if (is_champion) {
    return NominationFormStatus.AWARDED;
  } else if (champion_shortlist_status) {
    return NominationFormStatus.SHORTLISTED;
  } else if (is_service_level_winner) {
    return NominationFormStatus.AWARDED;
  } else if (endorsement_status === EndorsementStatus.COMMENDABLE) {
    return NominationFormStatus.ENDORSED;
  } else if (endorsement_status === EndorsementStatus.NEUTRAL) {
    return NominationFormStatus.SUBMITTED;
  } else if (endorsement_status === EndorsementStatus.PENDING) {
    return NominationFormStatus.PENDING;
  } else if (draft_status) {
    return NominationFormStatus.INCOMPLETE;
  }
}

// export interface NominationDataTableData {
//   case_id: string;
//   nominee_name: string;
//   nominee_designation: string;
//   nominee_department: string | null;
//   nomination_date: string | Date;
//   endorsement_status: EndorsementStatus;
//   committee_service_Level?: ServiceLevel;
//   committee_total_Score?: number;
//   is_top_winner_result: boolean;
//   draft_status: boolean;
//   is_service_level_shortlist_result: boolean;
//   is_top_winner_shortlist_result: boolean;
// }

export function createData(
  case_id: string,
  nominee_name: string,
  nominee_designation: string,
  is_top_winner_result: boolean,
  draft_status: boolean,
  is_service_level_shortlist_result: boolean,
  is_top_winner_shortlist_result: boolean,
  endorsement_status: EndorsementStatus,
  nominee_department: DepartmentType,
  nomination_date: string | Date,
  nomination_status: NominationFormStatus,
  committee_service_level?: ServiceLevel,
  committee_total_score?: number
): NominationDataTableData {
  return {
    case_id,
    nominee_name,
    nominee_designation,
    is_top_winner_result,
    draft_status,
    is_service_level_shortlist_result,
    is_top_winner_shortlist_result,
    endorsement_status,
    nominee_department,
    nomination_date,
    nomination_status,
    committee_service_level,
    committee_total_score,
  };
}
