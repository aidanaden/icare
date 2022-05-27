import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevel,
  ShortlistStatus,
} from "@/enums";
import {
  CommitteeMemberQueryData,
  NominationDetailQueryData,
} from "@/interfaces";
import { createData, getNominationFormStatus } from "@/utils";

export const SampleCommitteeMemberQueryData: CommitteeMemberQueryData = {
  staff_id: 124543,
  committee_name: "",
  shortlist_status: ShortlistStatus.FALSE,
  top_winner_status: false,
  committee_designation: "",
  committee_department: "",
  committee_comments: "",
};

export const SampleNominationQueryData: NominationDetailQueryData = {
  nominee_name: "Jolynn Tan",
  nominee_designation: "",
  nominee_department: "",
  nomination_date: new Date(),
  nominator_name: "",
  nominator_designation: "",
  nominator_department: "",
  nomination_reason: "",
  quiz_service_level: ServiceLevel.UNBELIEVABLE,
  quiz_score: 12,
  draft_status: true,
  service_level_award: true,
  champion_shortlist_status: true,
  champion_award: false,
  hod_name: "",
  hod_department: "",
  hod_designation: "",
  endorsement_status: "",
  hod_comments: "",
  committee_total_score: 66.4,
  committee_service_level: ServiceLevel.SURPRISING,
  committee_comment: [SampleCommitteeMemberQueryData],
  total_top_winner_status: false,
  status_code: 200,
  message: "",
};

export const DataTableSampleData = [
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.COMMENDABLE,
    DepartmentType.SFIT,
    "19/05/2022 08:00:34 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.COMMENDABLE,
    DepartmentType.SFIT,
    "17/05/2022 12:41:47 pm",
    getNominationFormStatus(
      EndorsementStatus.PENDING,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
  createData(
    "8185e247-6bd7-ec11-a7b5-000d3a85223c",
    "Mary Doe",
    "Director",
    false,
    false,
    true,
    false,
    EndorsementStatus.NEUTRAL,
    DepartmentType.IT,
    "17/05/2022 12:46:36 pm",
    getNominationFormStatus(
      EndorsementStatus.COMMENDABLE,
      false,
      false,
      false,
      false
    ),
    ServiceLevel.DESIRED,
    26
  ),
];
