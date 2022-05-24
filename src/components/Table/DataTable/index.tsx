import { Box } from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import DataTableTabPanel, {
  DataTableTabPanelProps,
} from "../Common/DataTableTabPanel";
import { StyledTab } from "../Common/StyledTab";
import { NominationFormStatus } from "@/enums";

interface DataTableProps {
  tabPanelData: DataTableTabPanelProps[];
}

export default function DataTable({ tabPanelData, ...other }: DataTableProps) {
  const [nominationValue, setNominationValue] = useState<NominationFormStatus>(
    NominationFormStatus.ALL
  );

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: NominationFormStatus
  ) => {
    setNominationValue(newValue);
  };

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
        <DataTableTabPanel
          headerLabel={panelData.headerLabel}
          data={panelData.data}
          status={panelData.status}
          key={`panel ${i}`}
        />
      ))}
    </TabContext>
  );
}
