import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { NominationFormStatus } from "@/enums";
import { useRouter } from "next/router";
import { WinnerData } from "@/interfaces";
import WinnerTableTabPanel, {
  WinnerTabPanelProps,
} from "../WinnerTableTabPanel";
import { PastWinnerTableKeys } from "../../Common/Columns";
import { StyledTab } from "../../Common/StyledTab";

interface WinnerDataTableProps {
  tabPanelData: Omit<WinnerTabPanelProps, "year" | "years" | "setYear">[];
  year: string;
  years: string[];
  setYear: Dispatch<SetStateAction<string | undefined>>;
}

export default function WinnerDataTable({
  tabPanelData,
  year,
  years,
  setYear,
  ...other
}: WinnerDataTableProps) {
  const [nominationValue, setNominationValue] = useState<NominationFormStatus>(
    NominationFormStatus.ALL
  );
  const router = useRouter();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: NominationFormStatus
  ) => {
    setNominationValue(newValue);
    router.query.tab = newValue.toString();
  };

  useEffect(() => {
    if (router.query.tab) {
      setNominationValue(router.query.tab as NominationFormStatus);
    }
  }, []);

  return (
    <TabContext value={nominationValue}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#F4F7F9",
          px: 2,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <TabList
          onChange={handleTabChange}
          aria-label="nomination-table-tabs"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile={true}
          sx={{
            "& .MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0.3,
            },
          }}
        >
          {tabPanelData.map((panelData, i) => (
            <StyledTab
              key={`panel header ${i}`}
              label={panelData.headerLabel}
              value={panelData.status}
              disableRipple
            />
          ))}
        </TabList>
      </Box>
      {tabPanelData.map((panelData, i) => (
        <WinnerTableTabPanel
          year={year}
          years={years}
          setYear={setYear}
          data={panelData.data}
          key={`panel ${i}`}
        />
      ))}
    </TabContext>
  );
}
