import { NominationDataTableData } from "@/interfaces";
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

export interface Column {
  id:
    | keyof Pick<
        NominationDataTableData,
        | "nominee_name"
        | "nominator_name"
        | "nominee_department"
        | "nominee_team"
        | "nomination_status"
        | "nomination_created_date"
        | "nomination_submitted_date"
        | "quiz_service_level"
        | "committee_vote"
      >;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: Date) => string;
}

export interface SimpleColumn extends Column {
  id: keyof Pick<
    NominationDataTableData,
    | "nominee_name"
    | "nominator_name"
    | "nominee_department"
    | "nominee_team"
    | "nomination_created_date"
    | "quiz_service_level"
  >;
}

export const columns: readonly Column[] = [
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
    id: "nomination_created_date",
    label: "Created",
    minWidth: 100,
    align: "right",
  },
];

export const submittedColumns: readonly Column[] = [
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
    id: "nomination_submitted_date",
    label: "Submitted",
    minWidth: 100,
    align: "right",
  },
];

export const committeeColumns: readonly Column[] = [
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
    id: "nomination_submitted_date",
    label: "Submitted",
    minWidth: 100,
    align: "right",
  },
];

export const simpleColumns: readonly SimpleColumn[] = [
  { id: "nominee_name", label: "Nominee", minWidth: 160 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "nomination_created_date",
    label: "Created",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];
