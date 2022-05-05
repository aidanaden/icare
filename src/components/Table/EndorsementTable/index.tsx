import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { DataTableData } from "@/interfaces";
import { DepartmentType, NominationFormStatus } from "@/enums";
import DataTableTabPanel, {
  DataTableTabPanelProps,
} from "../Common/DataTableTabPanel";
import { StyledTab } from "../Common/StyledTab";
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

  const TabPanelData: DataTableTabPanelProps[] = [
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

  return <DataTable tabPanelData={TabPanelData} />;
}
