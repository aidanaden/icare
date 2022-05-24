import { formatDateToString } from "@/utils";

export interface Column {
  id: "nominee" | "department" | "date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: Date) => string;
}

export const columns: readonly Column[] = [
  { id: "nominee", label: "Nominee", minWidth: 100 },
  { id: "department", label: "Department", minWidth: 100 },
  { id: "status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "date",
    label: "Created",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];
