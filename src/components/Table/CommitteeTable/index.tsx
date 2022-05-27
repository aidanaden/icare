import { NominationDataTableData } from "@/interfaces";
import { EndorsementStatus, NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";

interface DataTableProps {
  data: NominationDataTableData[];
}

export default function EndorsementTable({ data, ...other }: DataTableProps) {
  const completedData = data.filter(
    (row) => row.endorsement_status !== EndorsementStatus.PENDING
  );

  const endorsedData = data.filter(
    (row) => row.endorsement_status === EndorsementStatus.COMMENDABLE
  );

  const shortlistedData = data.filter(
    (row) => row.is_top_winner_shortlist_result === true
  );

  const awardedData = data.filter(
    (row) => row.is_service_level_shortlist_result === true
  );

  const tabPanelData: DataTableTabPanelProps[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      headerLabel: NominationFormStatus.ENDORSED.toString(),
      status: NominationFormStatus.ENDORSED,
      data: endorsedData,
    },
    {
      headerLabel: "Award Winners",
      status: NominationFormStatus.AWARDED,
      data: awardedData,
    },
    {
      headerLabel: "Shortlisted Champions",
      status: NominationFormStatus.SHORTLISTED,
      data: shortlistedData,
    },
    {
      headerLabel: "Champions",
      status: NominationFormStatus.PENDING,
      data: [],
    },
  ];

  return <DataTable tabPanelData={tabPanelData} />;
}
