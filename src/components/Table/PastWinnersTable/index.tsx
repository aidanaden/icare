import { WinnerData, WinnerHistoryQueryData } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import { postAPI } from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";
import WinnerDataTable from "./WinnerDataTable";
import { WinnerTabPanelProps } from "./WinnerTableTabPanel";
import useSWR from "swr";
import { getYearsBetweenYearAndCurrent } from "@/utils";
import ErrorFallback from "@/components/Common/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { STARTING_YEAR } from "@/constants";

function returnPreviousYear(year: string) {
  const numYear = parseInt(year) - 1;
  if (numYear < parseInt(STARTING_YEAR)) {
    return STARTING_YEAR;
  }
  const strYear = numYear.toString();
  return strYear;
}

export default function PastWinnersTable() {
  const { user } = useAuth();
  const currentFinancialYear =
    user?.year ?? new Date().getFullYear().toString();
  const [year, setYear] = useState<string>(
    returnPreviousYear(currentFinancialYear)
  );
  const years = getYearsBetweenYearAndCurrent(currentFinancialYear);

  const { data, error } = useSWR<WinnerHistoryQueryData>(
    [
      "RetrieveAwardWinnerHistory",
      {
        financial_year: year,
      },
    ],
    postAPI,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const awardedData = useMemo(
    () => data?.award_winner_list.filter((row) => !row.is_champion_result),
    [data]
  );

  const championData = useMemo(
    () => data?.award_winner_list.filter((row) => row.is_champion_result),
    [data]
  );

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

  // dont display past winner table if before 2023
  if (new Date().getFullYear() < 2023) {
    return <></>;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WinnerDataTable
        tabPanelData={tabPanelData}
        year={year}
        years={years}
        setYear={setYear}
      />
    </ErrorBoundary>
  );
}
