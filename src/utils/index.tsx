import { NominationFormStatus } from "@/enums";
import { DataTableData } from "@/interfaces";

export function formatDateToString(value: Date) {
  return value.toLocaleDateString("en-GB");
}

export function createData(
  nominee: string,
  department: string,
  status: NominationFormStatus,
  date: Date
): DataTableData {
  return { nominee, department, status, date };
}
