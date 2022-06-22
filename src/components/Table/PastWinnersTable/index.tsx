import {
  NominationDataTableData,
  WinnerData,
  WinnerHistoryQueryData,
} from "@/interfaces";
import { NominationFormStatus } from "@/enums";
import { DataTableTabPanelProps } from "../Common/DataTableTabPanel";
import DataTable from "../DataTable";
import { committeeColumns, PastWinnerTableKeys } from "../Common/Columns";
import { useEffect, useState } from "react";
import { postAPI } from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";
import WinnerDataTable from "./WinnerDataTable";
import { WinnerTabPanelProps } from "./WinnerTableTabPanel";

export default function PastWinnersTable() {
  const { user } = useAuth();
  const [year, setYear] = useState<string>(user?.year ?? "2022");
  const [data, setData] = useState<WinnerData[]>();

  const awardedData = data?.filter((row) => !row.is_champion_result);
  const championData = data?.filter((row) => row.is_champion_result);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postAPI<WinnerHistoryQueryData>(
          "RetrieveAwardWinnerHistory",
          { year: year }
        );
        if (response.status_code === 200) {
          setData(response.award_winner_list);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [year]);

  const tabPanelData: Omit<
    WinnerTabPanelProps,
    "year" | "years" | "setYear"
  >[] = [
    {
      data: awardedData,
    },
    {
      data: championData,
    },
  ];

  return (
    <WinnerDataTable
      tabPanelData={tabPanelData}
      year={year}
      years={years}
      setYear={setYear}
    />
  );
}
