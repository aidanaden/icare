import { NominationDataTableData, WinnerData } from "@/interfaces";
import { PastWinnerTableKeys } from "./Components/Columns";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let first;
  let second;

  if (orderBy.toString().includes("date")) {
    first = new Date(a[orderBy] as unknown as string);
    second = new Date(b[orderBy] as unknown as string);
  } else {
    first = a[orderBy];
    second = b[orderBy];
  }

  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getPastWinnerComparator<Key extends keyof PastWinnerTableKeys>(
  order: Order,
  orderBy: Key
): (a: WinnerData, b: WinnerData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getComparator<Key extends keyof NominationDataTableData>(
  order: Order,
  orderBy: Key
): (a: NominationDataTableData, b: NominationDataTableData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getSimpleComparator<
  Key extends keyof Omit<NominationDataTableData, "nomination_status">
>(
  order: Order,
  orderBy: Key
): (
  a: Omit<NominationDataTableData, "nomination_status">,
  b: Omit<NominationDataTableData, "nomination_status">
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
