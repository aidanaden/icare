import { NominationDataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";
import { submittedColumns } from "../Common/Columns";

interface NominationDataTableProps {
  data?: NominationDataTableData[];
}

export default function EndorsementTable({
  data,
  ...other
}: NominationDataTableProps) {
  const completedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.SUBMITTED
  );

  const endorsedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.ENDORSED
  );

  const shortlistedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.SHORTLISTED
  );

  const awardedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.AWARDED
  );

  const championData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.CHAMPION
  );

  const tabPanelData: Omit<DataTableTabPanelProps, "columns">[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
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
      columns={submittedColumns}
      {...other}
    />
  );
}
