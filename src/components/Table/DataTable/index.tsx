import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import DataTableTabPanel, {
  DataTableTabPanelProps,
} from "../Components/DataTableTabPanel";
import { StyledTab } from "../Components/StyledTab";
import { NominationFormStatus } from "@/enums";
import { Column, NominationDataTableKeys } from "../Components/Columns";
import { useRouter } from "next/router";

interface DataTableProps {
  tabPanelData: Omit<
    DataTableTabPanelProps,
    "columns" | "viewText" | "displayCommitteeVote"
  >[];
  columns: readonly Column<NominationDataTableKeys>[];
  viewText?: string;
  displayCommitteeVote?: boolean;
  hasYear?: boolean;
  hideNominator?: boolean;
  hasBadge?: boolean;
}

export default function DataTable({
  tabPanelData,
  columns,
  viewText,
  displayCommitteeVote,
  hasYear,
  hideNominator = false,
  hasBadge = false,
}: DataTableProps) {
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
        <DataTableTabPanel
          headerLabel={panelData.headerLabel}
          viewText={viewText}
          data={panelData.data}
          status={panelData.status}
          key={`panel ${i}`}
          columns={columns}
          displayCommitteeVote={displayCommitteeVote}
          hasYear={hasYear}
          hideNominator={hideNominator}
          hasBadge={hasBadge}
        />
      ))}
    </TabContext>
  );
}
