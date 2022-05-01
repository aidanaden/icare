import { DepartmentType, NominationFormStatus } from "@/enums";
import { Url } from "url";

export interface NavItemProps {
  href?: string;
  icon: any;
  title: string;
  items?: NavItemProps[];
}

export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface DataTableData {
  nominee: string;
  department: DepartmentType;
  status: NominationFormStatus;
  date: Date;
}
