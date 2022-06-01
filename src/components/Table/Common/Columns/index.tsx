import { NominationDataTableData } from "@/interfaces";
import { formatDateToString } from "@/utils";

export interface Column {
  id: keyof NominationDataTableData;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: Date) => string;
}

export const columns: readonly Column[] = [
  { id: "nominee_name", label: "Nominee", minWidth: 100 },
  { id: "nominee_department", label: "Department", minWidth: 100 },
  { id: "nominee_team", label: "Team", minWidth: 100 },
  { id: "status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "nomination_date",
    label: "Created",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];
