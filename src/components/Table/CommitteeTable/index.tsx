import { useMemo } from "react";

import { NominationDataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Components/DataTableTabPanel";
import DataTable from "../DataTable";
import { committeeColumns } from "../Components/Columns";

interface NominationDataTableProps {
  data?: NominationDataTableData[];
}

export default function CommitteeTable({
  data,
  ...other
}: NominationDataTableProps) {
  const completedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.SUBMITTED
      ),
    [data]
  );

  const submittedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.SUBMITTED
      ),
    [data]
  );

  const endorsedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.ENDORSED
      ),
    [data]
  );

  const rejectedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.REJECTED
      ),
    [data]
  );

  const shortlistedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.SHORTLISTED
      ),
    [data]
  );

  const awardedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.AWARDED
      ),
    [data]
  );

  const championData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.CHAMPION
      ),
    [data]
  );

  const tabPanelData: Omit<DataTableTabPanelProps, "columns">[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      headerLabel: `${NominationFormStatus.SUBMITTED.toString()} to HOD`,
      status: NominationFormStatus.SUBMITTED,
      data: submittedData,
    },
    {
      headerLabel: `${NominationFormStatus.REJECTED.toString()} by HOD`,
      status: NominationFormStatus.REJECTED,
      data: rejectedData,
    },
    {
      headerLabel: `${NominationFormStatus.ENDORSED.toString()} by HOD`,
      status: NominationFormStatus.ENDORSED,
      data: endorsedData,
    },
    {
      headerLabel: "Award Winners",
      status: NominationFormStatus.AWARDED,
      data: awardedData,
    },
    {
      headerLabel: "Shortlisted Champions (< 3 votes)",
      status: NominationFormStatus.SHORTLISTED,
      data: shortlistedData,
    },
    {
      headerLabel: "Champions (3 votes)",
      status: NominationFormStatus.CHAMPION,
      data: championData,
    },
  ];

  return (
    <DataTable
      tabPanelData={tabPanelData}
      columns={committeeColumns}
      displayCommitteeVote={true}
      viewText="Vote"
      hasYear={true}
      hasBadge={true}
      displayCommitteeServiceLevel={true}
      {...other}
    />
  );
}
