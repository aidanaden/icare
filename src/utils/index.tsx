import { DepartmentType, NominationFormStatus } from "@/enums";
import { DataTableData } from "@/interfaces";

export function formatDateToString(value: Date) {
  return value.toLocaleDateString("en-GB");
}

export function createData(
  nominee: string,
  department: DepartmentType,
  status: NominationFormStatus,
  date: Date
): DataTableData {
  return { nominee, department, status, date };
}

export const data = [
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.PENDING,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
];
