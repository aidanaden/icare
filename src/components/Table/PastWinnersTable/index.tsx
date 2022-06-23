import { WinnerData, WinnerHistoryQueryData } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import { postAPI } from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";
import WinnerDataTable from "./WinnerDataTable";
import { WinnerTabPanelProps } from "./WinnerTableTabPanel";
import useSWR from "swr";
import { getYearsBetweenYearAndCurrent } from "@/utils";

export default function PastWinnersTable() {
  const { user } = useAuth();
  const [year, setYear] = useState<string>(
    user?.year ?? new Date().getFullYear().toString()
  );
  const years = getYearsBetweenYearAndCurrent(
    user?.year ?? new Date().getFullYear().toString()
  );

  console.log("years: ", years);

  const { data, error } = useSWR<WinnerHistoryQueryData>(
    [
      "RetrieveAwardWinnerHistory",
      {
        financial_year: year,
      },
    ],
    postAPI
  );

  const awardedData = useMemo(
    () => data?.award_winner_list.filter((row) => !row.is_champion_result),
    [data]
  );

  const championData = useMemo(
    () => data?.award_winner_list.filter((row) => row.is_champion_result),
    [data]
  );

  console.log("data: ", data);
  console.log("champion data: ", championData);
  console.log("winner data: ", awardedData);

  const tabPanelData: Omit<
    WinnerTabPanelProps,
    "year" | "years" | "setYear"
  >[] = [
    {
      headerLabel: "Awarded",
      status: "Awarded",
      data: awardedData,
    },
    {
      headerLabel: "Champion",
      status: "Champion",
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
