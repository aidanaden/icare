import { DataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";

interface DataTableProps {
  data: DataTableData[];
}

export default function EndorsementTable({ data, ...other }: DataTableProps) {
  const endorsedData = data.filter(
    (row) => row.status === NominationFormStatus.ENDORSED
  );
  const completedData = data.filter(
    (row) => row.status === NominationFormStatus.SUBMITTED
  );

  const tabPanelData: DataTableTabPanelProps[] = [
    {
      headerLabel: NominationFormStatus.ALL.toString(),
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      headerLabel: "Pending",
      status: NominationFormStatus.SUBMITTED,
      data: completedData,
    },
    {
      headerLabel: NominationFormStatus.ENDORSED.toString(),
      status: NominationFormStatus.ENDORSED,
      data: endorsedData,
    },
  ];

  return <DataTable tabPanelData={tabPanelData} />;
}
