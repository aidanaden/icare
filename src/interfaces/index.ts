import { DepartmentType, NominationFormStatus, ShortlistStatus } from "@/enums";
import { Url } from "url";

export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface DataTableData {
  nominee: string;
  department: DepartmentType;
  status: NominationFormStatus;
  date: Date;
}

export interface CommitteeMemberQueryData {
  staff_id: number;
  committee_name: string;
  committee_shortlist_status: ShortlistStatus;
  top_winner_status: boolean;
  committee_designation: string;
  committee_department: string;
}

export interface NominationQueryData {
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nomination_date: Date;
  nominator_name: string;
  nominator_designation: string;
  nominator_department: string;
  description: string;
  hod_name: string;
  hod_designation: string;
  endorsement_status: string;
  hod_comments: string;
  committee_total_score: number;
  quiz_service_level: string;
  quiz_score: number;
  total_top_winner_status: boolean;
  committee_comment: CommitteeMemberQueryData;
}
