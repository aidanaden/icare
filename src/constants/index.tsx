import {
  DepartmentType,
  NominationFormStatus,
  ServiceLevel,
  ShortlistStatus,
} from "@/enums";
import { CommitteeMemberQueryData, NominationQueryData } from "@/interfaces";
import { createData } from "@/utils";

export const SampleCommitteeMemberQueryData: CommitteeMemberQueryData = {
  staff_id: 124543,
  committee_name: "",
  committee_shortlist_status: ShortlistStatus.FALSE,
  top_winner_status: false,
  committee_designation: "",
  committee_department: "",
};

export const SampleNominationQueryData: NominationQueryData = {
  nominee_name: "Jolynn Tan",
  nominee_designation: "",
  nominee_department: "",
  nomination_date: new Date(),
  nominator_name: "",
  nominator_designation: "",
  nominator_department: "",
  description: "",
  quiz_service_level: ServiceLevel.UNBELIEVABLE,
  quiz_score: 12,
  draft_status: true,
  is_service_level_shortlist_result: true,
  is_top_winner_shortlist_result: true,
  is_top_winner_result: false,
  hod_name: "",
  hod_designation: "",
  endorsement_status: "",
  hod_comments: "",
  committee_total_score: 66.4,
  committee_service_level: ServiceLevel.SURPRISING,
  committee_comment: [SampleCommitteeMemberQueryData],
  total_top_winner_status: false,
};

export const DataTableSampleData = [
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
