import { NominationFormStatus } from "@/enums";
import { DataTableData, NominationDataTableData } from "@/interfaces";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";

interface TableProps {
  data?: NominationDataTableData[];
}

export default function NominationTable({ data }: TableProps) {
  const incompleteData = data?.filter(
    (row) => row.nomination_status === NominationFormStatus.INCOMPLETE
  );
  const completedData = data?.filter(
    (row) => row.nomination_status !== NominationFormStatus.INCOMPLETE
  );

  const tabPanelData: DataTableTabPanelProps[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
      isDeletable: true,
    },
    {
      headerLabel: "Completed",
      status: "completed",
      data: completedData,
      isDeletable: true,
    },
    {
      headerLabel: NominationFormStatus.INCOMPLETE.toString(),
      status: NominationFormStatus.INCOMPLETE,
      data: incompleteData,
      isDeletable: true,
    },
  ];
  return <DataTable tabPanelData={tabPanelData} isDeletable={true} />;
}
