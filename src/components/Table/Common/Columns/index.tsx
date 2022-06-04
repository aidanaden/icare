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
  id: keyof Pick<
    NominationDataTableData,
    | "nominee_name"
    | "nominator_name"
    | "nominee_department"
    | "nominee_team"
    | "nomination_status"
    | "nomination_date"
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
    | "nomination_date"
  >;
}

export const columns: readonly Column[] = [
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominator_name", label: "Nominated by", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  { id: "nominee_team", label: "Team", minWidth: 100 },
  { id: "nomination_status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "nomination_date",
    label: "Created",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];

export const simpleColumns: readonly SimpleColumn[] = [
  { id: "nominee_name", label: "Nominee", minWidth: 170 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  {
    id: "nomination_date",
    label: "Created",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];
