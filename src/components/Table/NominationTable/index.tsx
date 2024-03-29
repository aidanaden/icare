import { useMemo } from "react";

import { NominationFormStatus } from "@/enums";
import { NominationDataTableData } from "@/interfaces";
import { columns } from "../Components/Columns";
import { DataTableTabPanelProps } from "../Components/DataTableTabPanel";
import DataTable from "../DataTable";

interface TableProps {
  data?: NominationDataTableData[];
}

export default function NominationTable({ data }: TableProps) {
  const incompleteData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.INCOMPLETE
      ),
    [data]
  );

  const completedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status !== NominationFormStatus.INCOMPLETE
      ),
    [data]
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
  return (
    <DataTable
      tabPanelData={tabPanelData}
      columns={columns}
      hasYear={true}
      hideNominator={true}
    />
  );
}
