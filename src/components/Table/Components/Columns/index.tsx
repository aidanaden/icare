import { NominationDataTableData, WinnerData } from "@/interfaces";
import { formatDateToString } from "@/utils";

// export interface NominationDataTableData {
//   case_id: string;
//   nominee_designation: string;
//   endorsement_status: EndorsementStatus;
//   committee_service_level?: ServiceLevel;
//   committee_total_score?: number;
//   is_champion_result: boolean;
//   draft_status: boolean;
//   is_service_level_winner: ServiceLevelWinner;
//   is_champion_shortlist_result: boolean;
// }

export interface Column<K> {
  id: keyof K;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}

export type NominationDataTableKeys = Pick<
  NominationDataTableData,
  | "nominee_name"
  | "nominator_name"
  | "nominee_department"
  | "nominee_team"
  | "nomination_status"
  | "nomination_date"
  | "quiz_service_level"
  | "committee_vote"
>;

export type SimpleDataTableKeys = Pick<
  NominationDataTableData,
  | "nominee_name"
  | "nominator_name"
  | "nominee_department"
  | "nominee_team"
  | "nomination_created_date"
  | "quiz_service_level"
>;

export type PastWinnerTableKeys = Omit<WinnerData, "is_champion_result">;

export const columns: readonly Column<NominationDataTableKeys>[] = [
  { id: "nominator_name", label: "Nominator", minWidth: 100 },
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "quiz_service_level",
    label: "Service Level",
    minWidth: 100,
  },
  { id: "nominee_team", label: "Team", minWidth: 100 },
  { id: "nomination_status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "nomination_date",
    label: "Created",
    minWidth: 100,
    align: "right",
  },
];

export const submittedColumns: readonly Column<NominationDataTableKeys>[] = [
  { id: "nominator_name", label: "Nominator", minWidth: 100 },
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "quiz_service_level",
    label: "Service Level",
    minWidth: 100,
  },
  { id: "nominee_team", label: "Team", minWidth: 100 },
  { id: "nomination_status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "nomination_date",
    label: "Submitted",
    minWidth: 100,
    align: "right",
  },
];

export const committeeColumns: readonly Column<NominationDataTableKeys>[] = [
  { id: "nominator_name", label: "Nominator", minWidth: 100 },
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "quiz_service_level",
    label: "Service Level",
    minWidth: 180,
  },
  { id: "nominee_team", label: "Team", minWidth: 100 },
  { id: "nomination_status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "committee_vote",
    label: "Champion Vote",
    align: "center",
    minWidth: 200,
  },
  {
    id: "nomination_date",
    label: "Submitted",
    minWidth: 100,
    align: "right",
  },
];

export const simpleColumns: readonly Column<SimpleDataTableKeys>[] = [
  { id: "nominee_name", label: "Nominee", minWidth: 160 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "nomination_created_date",
    label: "Created",
    minWidth: 100,
    align: "right",
  },
];

export const winnerColumns: readonly Column<PastWinnerTableKeys>[] = [
  { id: "nominator_name", label: "Nominator", minWidth: 100 },
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "committee_service_level",
    label: "Service Level",
    minWidth: 180,
  },
  {
    id: "nominee_prize",
    label: "Nominee prize",
    minWidth: 180,
  },
  {
    id: "nominator_prize",
    label: "Nominator prize",
    minWidth: 180,
  },
];
