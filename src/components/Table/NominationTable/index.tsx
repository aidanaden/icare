import { NominationFormStatus } from "@/enums";
import { DataTableData, NominationDataTableData } from "@/interfaces";
import { columns } from "../Common/Columns";
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

  const tabPanelData: Omit<DataTableTabPanelProps, "columns" | "viewText">[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      headerLabel: "Completed",
      status: "completed",
      data: completedData,
    },
    {
      headerLabel: NominationFormStatus.INCOMPLETE.toString(),
      status: NominationFormStatus.INCOMPLETE,
      data: incompleteData,
    },
  ];
  return <DataTable tabPanelData={tabPanelData} columns={columns} />;
}
