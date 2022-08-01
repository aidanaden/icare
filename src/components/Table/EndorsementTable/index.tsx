import { NominationDataTableData } from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Components/DataTableTabPanel";
import DataTable from "../DataTable";
import { submittedColumns } from "../Components/Columns";
import { useMemo } from "react";

interface NominationDataTableProps {
  data?: NominationDataTableData[];
}

export default function EndorsementTable({
  data,
  ...other
}: NominationDataTableProps) {
  const endorsedData = useMemo(() => {
    return data?.filter(
      (row) => row.nomination_status === NominationFormStatus.ENDORSED
    );
  }, [data]);

  const pendingData = useMemo(() => {
    return data?.filter(
      (row) => row.nomination_status === NominationFormStatus.PENDING
    );
  }, [data]);

  const submittedData = useMemo(
    () =>
      data?.filter(
        (row) => row.nomination_status === NominationFormStatus.SUBMITTED
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
