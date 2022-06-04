import { NominationDataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";

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

  const tabPanelData: Omit<DataTableTabPanelProps, "isDeletable">[] = [
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

  return <DataTable tabPanelData={tabPanelData} isDeletable={false} />;
}
