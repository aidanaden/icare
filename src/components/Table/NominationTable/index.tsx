import { NominationFormStatus } from "@/enums";
import { DataTableData } from "@/interfaces";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";

interface TableProps {
  data: DataTableData[];
}

export default function NominationTable({ data }: TableProps) {
  const incompleteData = data.filter(
    (row) => row.status === NominationFormStatus.INCOMPLETE
  );
  const completedData = data.filter(
    (row) => row.status !== NominationFormStatus.INCOMPLETE
  );

  const tabPanelData: DataTableTabPanelProps[] = [
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
  return <DataTable tabPanelData={tabPanelData} />;
}
