import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useRouter } from "next/router";
import WinnerTableTabPanel, {
  WinnerTabPanelProps,
} from "../WinnerTableTabPanel";
import { StyledTab } from "../../Components/StyledTab";

interface WinnerDataTableProps {
  tabPanelData: Omit<WinnerTabPanelProps, "year" | "years" | "setYear">[];
  year: string;
  years: string[];
  setYear: Dispatch<SetStateAction<string>>;
}

export default function WinnerDataTable({
  tabPanelData,
  year,
  years,
  setYear,
}: WinnerDataTableProps) {
  const [tabValue, setTabValue] = useState<"Champion" | "Awarded">("Awarded");
  const router = useRouter();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "Champion" | "Awarded"
  ) => {
    setTabValue(newValue);
    router.query.tab = newValue.toString();
  };

  useEffect(() => {
    if (router.query.tab) {
      setTabValue(router.query.tab as "Champion" | "Awarded");
    }
  }, []);

  return (
    <TabContext value={tabValue}>
      <Box
        sx={{
          // border: 1,
          // borderColor: "darkgray",
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
          headerLabel={panelData.headerLabel}
          status={panelData.status}
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
