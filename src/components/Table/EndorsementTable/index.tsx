import { NominationDataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Components/DataTableTabPanel";
import DataTable from "../DataTable";
import { submittedColumns } from "../Components/Columns";

interface NominationDataTableProps {
  data?: NominationDataTableData[];
}

export default function EndorsementTable({
  data,
  ...other
}: NominationDataTableProps) {
  const endorsedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.ENDORSED
  );
  const pendingData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.PENDING
  );
  const submittedData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.SUBMITTED
  );

  const tabPanelData: Omit<
    DataTableTabPanelProps,
    "columns" | "viewText" | "displayCommitteeVote"
  >[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      headerLabel: NominationFormStatus.PENDING.toString(),
      status: NominationFormStatus.PENDING,
      data: pendingData,
    },
    {
      headerLabel: NominationFormStatus.SUBMITTED.toString(),
      status: NominationFormStatus.SUBMITTED,
      data: submittedData,
    },
    {
      headerLabel: NominationFormStatus.ENDORSED.toString(),
      status: NominationFormStatus.ENDORSED,
      data: endorsedData,
    },
  ];

  return (
    <DataTable
      tabPanelData={tabPanelData}
      columns={submittedColumns}
      viewText="Endorse"
      hideNominator={false}
      {...other}
    />
  );
}
